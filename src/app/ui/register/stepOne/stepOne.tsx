// Components

// Images
import { ArrowForwardIos } from "@mui/icons-material";
// Imports
import * as yup from "yup";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "@mui/material";
import Link from "next/link";
import { RegisterStepOne } from "@/helpers/types";
import { parse, isValid, subYears } from "date-fns";
import { useEffect } from "react";
// Styles
import s from "./stepOne.module.scss";

type StepOneProps = {
  step: React.Dispatch<React.SetStateAction<number>>;
  setData: React.Dispatch<React.SetStateAction<RegisterStepOne>>;
  data: RegisterStepOne;
};

export default function StepOne({ step, setData, data }: StepOneProps) {
  const today = new Date();
  const minAge = 18;
  const validationSchema = yup.object({
    fullName: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    phone: yup.string().required("Telefone é obrigatório"),
    cpf: yup.string().required("CPF é obrigatório"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
        "Sua senha não atende aos requisitos"
      )
      .matches(/^\S*$/, "A senha não pode conter espaços")
      .required("Senha é obrigatória"),
    birthDate: yup
      .string()
      .required("Data de nascimento é obrigatória")
      .test("valid-date", "Data inválida", (value) => {
        if (!value) return false;
        const parsedDate = parse(value, "yyyy-MM-dd", new Date());
        return isValid(parsedDate);
      })
      .test("age-limit", `Você deve ter pelo menos ${minAge} anos`, (value) => {
        if (!value) return false;
        const parsedDate = parse(value, "yyyy-MM-dd", new Date());
        return isValid(parsedDate) && parsedDate <= subYears(today, minAge);
      }),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "As senhas não coincidem")
      .required("Confirmar Senha é obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      cpf: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone.replace(/\D/g, ""),
        cpf: values.cpf.replace(/\D/g, ""),
        birthDate: values.birthDate,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      setData(data);
      step(1);
    },
  });

  const header = <div className="font-bold mb-3">Escolha uma senha</div>;
  const PasswordRequirements = ({
    isLowercase,
    isUppercase,
    isNumber,
    isLengthValid,
  }: {
    isLowercase: boolean;
    isUppercase: boolean;
    isNumber: boolean;
    isLengthValid: boolean;
  }) => {
    return (
      <div className={s.passwordRequirements}>
        <p> Pelo menos uma letra minúscula {isLowercase ? "✔" : ""}</p>
        <p> Pelo menos uma letra maiúscula {isUppercase ? "✔" : ""}</p>
        <p> Pelo menos um número {isNumber ? "✔" : ""}</p>
        <p> Mínimo de 8 caracteres {isLengthValid ? "✔" : ""}</p>
      </div>
    );
  };

  const handleCpf = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    value = value
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

    formik.setFieldValue("cpf", value);
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    value = value
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/^(\(\d{2}\) )(\d{5})(\d)/, "$1$2-$3");

    formik.setFieldValue("phone", value);
  };

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      formik.setFieldValue("fullName", data.fullName);
      formik.setFieldValue("email", data.email);
      handlePhone({
        target: { value: data.phone },
      } as React.ChangeEvent<HTMLInputElement>);
      handleCpf({
        target: { value: data.cpf },
      } as React.ChangeEvent<HTMLInputElement>);
      formik.setFieldValue("birthDate", data.birthDate);
      formik.setFieldValue("password", data.password);
      formik.setFieldValue("confirmPassword", data.confirmPassword);
    }
  }, []);
  return (
    <form onSubmit={formik.handleSubmit} className={s.wrapperForm}>
      <h2>Dados Pessoais</h2>
      <label>
        <span>Nome completo</span>
        <InputText
          id="inputFullName"
          type="text"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="fullName"
          className={
            formik.errors.fullName && formik.touched.fullName
              ? "fieldError field"
              : "field"
          }
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <p className="error">{formik.errors.fullName}</p>
        )}
      </label>
      <div className={s.wrapperTwoFields}>
        <label>
          <span>E-mail</span>
          <InputText
            id="inputEmail"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.email && formik.touched.email
                ? "fieldError field"
                : "field"
            }
          />
          {formik.touched.email && formik.errors.email && (
            <p className="error">{formik.errors.email}</p>
          )}
        </label>
        <label>
          <span>Telefone</span>
          <InputText
            id="inputPhone"
            name="phone"
            value={formik.values.phone}
            onChange={(e) => handlePhone(e)}
            onBlur={formik.handleBlur}
            className={
              formik.errors.phone && formik.touched.phone
                ? "fieldError field"
                : "field"
            }
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="error">{formik.errors.phone}</p>
          )}
        </label>
      </div>
      <div className={s.wrapperTwoFields}>
        <label>
          <span>CPF</span>
          <InputText
            id="inputCpf"
            name="cpf"
            value={formik.values.cpf}
            onChange={(e) => {
              handleCpf(e);
            }}
            onBlur={formik.handleBlur}
            className={
              formik.errors.cpf && formik.touched.cpf
                ? "fieldError field"
                : "field"
            }
          />
          {formik.touched.cpf && formik.errors.cpf && (
            <p className="error">{formik.errors.cpf}</p>
          )}
        </label>
        <label>
          <span>Data de nascimento</span>
          <InputText
            id="inputBirthDate"
            name="birthDate"
            type="date"
            value={formik.values.birthDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.birthDate && formik.touched.birthDate
                ? "fieldError field"
                : "field"
            }
          />
          {formik.touched.birthDate && formik.errors.birthDate && (
            <p className="error">{formik.errors.birthDate}</p>
          )}
        </label>
      </div>
      <div className={s.wrapperTwoFields}>
        <label>
          <span>Senha</span>
          <Password
            id="inputPassword"
            name="password"
            onChange={formik.handleChange}
            onBlur={(e) => e.target.blur()}
            value={formik.values.password}
            toggleMask
            weakLabel="Fraca"
            mediumLabel="Média"
            strongLabel="Forte"
            promptLabel=" "
            header={header}
            footer={
              <PasswordRequirements
                isLowercase={/[a-z]/.test(formik.values.password)}
                isUppercase={/[A-Z]/.test(formik.values.password)}
                isNumber={/[0-9]/.test(formik.values.password)}
                isLengthValid={formik.values.password.length >= 8}
              />
            }
            className={
              formik.errors.password && formik.touched.password
                ? "fieldError passwordField"
                : "passwordField"
            }
          />
          {formik.touched.password && formik.errors.password && (
            <p className="error">{formik.errors.password}</p>
          )}
        </label>
        <label>
          <span>Confirmar senha</span>
          <Password
            id="inputConfirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            toggleMask
            feedback={false}
            className={
              formik.errors.confirmPassword && formik.touched.confirmPassword
                ? "fieldError passwordField"
                : "passwordField"
            }
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="error">{formik.errors.confirmPassword}</p>
          )}
        </label>
      </div>
      <div className={s.wrapperButton}>
        <Button type="submit" endIcon={<ArrowForwardIos />}>
          Continuar
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
