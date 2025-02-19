// Components

// Images
import { ArrowBackIos, CheckCircle } from "@mui/icons-material";
// Imports
import * as yup from "yup";
import { useFormik } from "formik";
import { RegisterStepTwo } from "@/helpers/types";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Button } from "@mui/material";
import { Dropdown } from "primereact/dropdown";
import Link from "next/link";
import { StateEnums } from "@/helpers/enums";	
// Styles
import s from "./stepTwo.module.scss";

type StepTwoProps = {
  step: React.Dispatch<React.SetStateAction<number>>;
  setData: React.Dispatch<React.SetStateAction<RegisterStepTwo>>;
};

export default function StepTwo({ step, setData }: StepTwoProps) {
  const validationSchema = yup.object({
    zipcode: yup
      .string()
      .matches(/^\d{5}-\d{3}$/, "CEP inválido")
      .required("CEP é obrigatório"),
    city: yup.string().required("Município é obrigatório"),
    state: yup.string().required("Estado é obrigatório"),
    neighborhood: yup.string().required("Bairro é obrigatório"),
    thoroughfare: yup.string().required("Logradouro é obrigatório"),
    addressNumber: yup.string().required("Nº é obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      zipcode: "",
      city: "",
      state: "",
      neighborhood: "",
      thoroughfare: "",
      addressNumber: "",
      additionalDetails: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        zipcode: values.zipcode.replace(/\D/g, ""),
        city: values.city,
        state: values.state,
        neighborhood: values.neighborhood,
        thoroughfare: values.thoroughfare,
        addressNumber: values.addressNumber,
        additionalDetails: values.additionalDetails,
      };
      setData(data);
    },
  });

  const handleBack = () => {
    step(0);
  };
  return (
    <form onSubmit={formik.handleSubmit} className={s.wrapperForm}>
      <h2>Endereço</h2>
      <div className={s.wrapperZipFields}>
        <label>
          <span>CEP</span>
          <InputMask
            mask="99999-999"
            value={formik.values.zipcode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="zipcode"
            className={
              formik.errors.zipcode && formik.touched.zipcode
                ? "fieldError field"
                : "field"
            }
          />
          {formik.touched.zipcode && formik.errors.zipcode && (
            <p className="error">{formik.errors.zipcode}</p>
          )}
        </label>
        <label>
          <span>Estado</span>
          <Dropdown
            id="inputState"
            type="text"
            value={formik.values.state}
            onChange={(e) => formik.setFieldValue("state", e.value.option)}
            onBlur={formik.handleBlur}
            optionLabel="option"
            name="state"
            placeholder={formik.values.state}
            options={StateEnums}
            panelClassName="dropdownPanel"
            className={
              formik.errors.state && formik.touched.state
                ? "fieldDropdownError field"
                : "field"
            }
          />
          {formik.touched.state && formik.errors.state && (
            <p className="error">{formik.errors.state}</p>
          )}
        </label>
        <label>
          <span>Município</span>
          <InputText
            id="inputCity"
            type="text"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="city"
            className={
              formik.errors.city && formik.touched.city
                ? "fieldError field"
                : "field"
            }
          />
          {formik.touched.city && formik.errors.city && (
            <p className="error">{formik.errors.city}</p>
          )}
        </label>
      </div>
      <div className={s.wrapperThreeFields}>
        <label>
          <span>Bairro</span>
          <InputText
            id="inputNeighborhood"
            type="text"
            value={formik.values.neighborhood}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="neighborhood"
            className={
              formik.errors.neighborhood && formik.touched.neighborhood
                ? "fieldError field"
                : "field"
            }
          />
          {formik.touched.neighborhood && formik.errors.neighborhood && (
            <p className="error">{formik.errors.neighborhood}</p>
          )}
        </label>
        <label>
          <span>Logradouro</span>
          <InputText
            id="inputThoroughfare"
            type="text"
            value={formik.values.thoroughfare}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="thoroughfare"
            className={
              formik.errors.thoroughfare && formik.touched.thoroughfare
                ? "fieldError field"
                : "field"
            }
          />
          {formik.touched.thoroughfare && formik.errors.thoroughfare && (
            <p className="error">{formik.errors.thoroughfare}</p>
          )}
        </label>
        <label>
          <span>Número</span>
          <InputText
            id="inputAddressNumber"
            type="text"
            value={formik.values.addressNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="addressNumber"
            className={
              formik.errors.addressNumber && formik.touched.addressNumber
                ? "fieldError field"
                : "field"
            }
          />
          {formik.touched.addressNumber && formik.errors.addressNumber && (
            <p className="error">{formik.errors.addressNumber}</p>
          )}
        </label>
      </div>
      <label>
        <span>Complemento</span>
        <InputText
          id="inputAdditionalDetails"
          type="text"
          value={formik.values.additionalDetails}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="additionalDetails"
          className="field"
        />
      </label>
      <div className={s.wrapperButton}>
        <Button
          type="button"
          className={s.backButton}
          startIcon={<ArrowBackIos />}
          onClick={handleBack}
        >
          Voltar
        </Button>
        <Button
          type="submit"
          className={s.submitButton}
          endIcon={<CheckCircle />}
        >
          Finalizar
        </Button>
      </div>
      <div className={s.wrapperFooter}>
        <Link href="/login">
          Já tem conta? <span>Entre aqui</span>
        </Link>
      </div>
    </form>
  );
}
