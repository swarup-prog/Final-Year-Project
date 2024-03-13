import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../utils/toast";
import { CustomButton } from "../../components";
import { PostRequest } from "../../services/httpRequest";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const OTPInput = () => {
  const navigate = useNavigate();
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const { email } = useParams();
  const OTP = useSelector((state) => state.otp.OTP);

  const resendOTP = async () => {
    if (disable) return;
    try {
      const response = await PostRequest("/recovery/mail", { email, OTP });
      if (response.status === 200) {
        toastSuccess(response.data.message);
        setDisable(true);
        setTimer(60);
      }
    } catch (error) {
      toastError(error.response.data.message);
    }
  };

  const verfiyOTP = () => {
    if (parseInt(OTPinput.join("")) === OTP) {
      navigate(`/reset-password/${email}`);
    } else {
      toastError("The code you have entered is incorrect.");
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <div>
            <form>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <InputBox
                    onChange={(e) =>
                      setOTPinput([
                        e.target.value,
                        OTPinput[1],
                        OTPinput[2],
                        OTPinput[3],
                      ])
                    }
                  />
                  <InputBox
                    onChange={(e) =>
                      setOTPinput([
                        OTPinput[0],
                        e.target.value,
                        OTPinput[2],
                        OTPinput[3],
                      ])
                    }
                  />
                  <InputBox
                    onChange={(e) =>
                      setOTPinput([
                        OTPinput[0],
                        OTPinput[1],
                        e.target.value,
                        OTPinput[3],
                      ])
                    }
                  />
                  <InputBox
                    onChange={(e) =>
                      setOTPinput([
                        OTPinput[0],
                        OTPinput[1],
                        OTPinput[2],
                        e.target.value,
                      ])
                    }
                  />
                </div>

                <div className="flex flex-col justify-center items-center space-y-5">
                  <CustomButton title="Verify OTP" onClick={verfiyOTP} />

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p>{" "}
                    <a
                      className="flex flex-row items-center"
                      style={{
                        color: disable ? "gray" : "red",
                        cursor: disable ? "none" : "pointer",
                        textDecorationLine: disable ? "none" : "underline",
                      }}
                      onClick={() => resendOTP()}
                    >
                      {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputBox = ({ onChange }) => {
  return (
    <div className="w-16 h-16 ">
      <input
        maxLength="1"
        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg focus-within:border-accent focus-within:ring-1 focus-within:ring-accent"
        type="text"
        name=""
        onChange={onChange}
      ></input>
    </div>
  );
};

export default OTPInput;
