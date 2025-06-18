"use client";
// Components

// Images

// Imports
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { Password } from "primereact/password";
import { Button } from "@mui/material";
// Styles
import s from "./page.module.scss";
import { InputText } from "primereact/inputtext";
import Link from "next/link";

export default function Login() {
  const validationSchema = yup.object({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup.string().required("Senha é obrigatória"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });
  return (
    <section className={s.wrapperLogin}>
      <Image
        src="/mercatto-logo.png"
        alt="Mercatto Logo"
        width={120}
        height={120}
        priority
      />
      <h1>LOGIN</h1>
      <div className={s.wrapperLoginForm}>
          <form className={s.wrapperForm}>
            <label>
              <span>E-mail</span>
              <InputText
                id="inputEmail"
                type="email"
                name="email"
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
              <div>
                <span>Senha</span>
                <Link href="/forgot-password">Esqueceu a senha?</Link>
              </div>
              <Password
                id="inputPassword"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.password && formik.touched.password
                    ? "fieldError passwordField"
                    : "passwordField"
                }
                toggleMask
                feedback={false}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="error">{formik.errors.password}</p>
              )}
            </label>
            <div>
              <Button>Entrar</Button>
            </div>
            <div>
              <Link href="/register">Não tem uma conta? Cadastre-se</Link>
            </div>
          </form>
      </div>
    </section>
  );
}
