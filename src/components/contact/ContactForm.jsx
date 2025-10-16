import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../assets/styles/Style.css";
import "../../assets/styles/Responsive.css";
import "../../assets/styles/Register.css";

export const ContactForm = () => {
  const initialValues = {
    name: "",
    email: "",
    telephone: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Nama wajib diisi"),
    email: Yup.string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    telephone: Yup.number()
      .typeError("Nomor telepon hanya boleh berisi angka")
      .required("Nomor telepon wajib diisi"),
    message: Yup.string().required("Pesan wajib diisi"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://localhost:5000/pesan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim pesan");
      }

      const data = await response.json();
      console.log("Pesan terkirim:", data);

      alert(
        "Pesan Anda berhasil dikirim! Terima kasih telah menghubungi kami."
      );
      resetForm();
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      alert("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nama:</label>
            <Field
              id="name"
              name="name"
              className="form-control"
              placeholder="Masukkan Nama Anda"
            />
            <div className="error-container">
              <ErrorMessage
                name="name"
                component="div"
                className="error-text"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                id="email"
                name="email"
                className="form-control"
                placeholder="Masukkan Email Anda"
              />
              <div className="error-container">
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-text"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="telephone">No Telepon:</label>
              <Field
                id="telephone"
                name="telephone"
                className="form-control"
                placeholder="Masukkan Nomor Telepon Anda"
              />
              <div className="error-container">
                <ErrorMessage
                  name="telephone"
                  component="div"
                  className="error-text"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Pesan:</label>
            <Field
              as="textarea"
              id="message"
              name="message"
              className="form-control"
              rows="5"
              placeholder="Masukkan Pesan Anda"
            />
            <div className="error-container">
              <ErrorMessage
                name="message"
                component="div"
                className="error-text"
              />
            </div>
          </div>

          <div>
            <button type="submit" className="btn-form">
              Kirim
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
