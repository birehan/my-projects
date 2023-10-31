import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import Notification from "./Notification";

const ContactForm = () => {
  const form: any = useRef();
  const [success, setSuccess] = useState(true);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add a loading state

  const [formData, setFormData] = useState({
    email: "",
    message: "",
    subject: "",
  });

  const sendEmail = (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (e) {
      emailjs
        .sendForm(
          process.env.REACT_APP_EMAIL_SERVICE_ID || "service_id", // Access the environment variable
          process.env.REACT_APP_EMAIL_TEMPLATE_ID || "template_jd", // Access the environment variable
          form.current,
          process.env.REACT_APP_EMAIL_PUBLIC_ID || "public_id" // Access the environment variable
        )
        .then(
          () => {
            setMessage("Email sent successfully");
            setSuccess(true);
            setShow(true);

            setFormData({
              email: "",
              message: "",
              subject: "",
            });
            setLoading(false);
          },
          () => {
            setMessage("Emait sent failed! try again");
            setSuccess(false);
            setShow(true);
            setLoading(false);
          }
        );
    }
    // }
  };

  // Handle input changes and update formData state
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className="flex flex-col gap-3" ref={form} onSubmit={sendEmail}>
      {show && (
        <Notification
          show={show}
          setShow={setShow}
          success={success}
          message={message}
        />
      )}

      <input
        type="email"
        className="border rounded-md p-4"
        placeholder="Email"
        required
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="text"
        className="border rounded-md p-4"
        placeholder="Subject"
        required
        name="subject"
        value={formData.subject}
        onChange={handleInputChange}
      />
      <textarea
        className="border rounded-md p-4"
        rows={4}
        placeholder="Message"
        name="message" // Updated the name attribute to "message"
        value={formData.message}
        onChange={handleInputChange}
      />
      <button className="bg-[#00B1F4] rounded-md p-[10px] text-white text-xl font-bold mt-2">
        {loading ? (
          <div className="flex items-center justify-center ">
            <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin"></div>
          </div>
        ) : (
          "SEND"
        )}
      </button>
    </form>
  );
};

export default ContactForm;
