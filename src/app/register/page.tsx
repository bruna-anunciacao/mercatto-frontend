"use client";
// Components
import RegisterStepForm from "../ui/register/stepForm/registerStepForm";
import StepOne from "../ui/register/stepOne/stepOne";
import StepTwo from "../ui/register/stepTwo/stepTwo";
// Images

// Imports
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { RegisterStepOne, RegisterStepTwo } from "@/helpers/types";
import toast from "react-hot-toast";
// Styles
import s from "./page.module.scss";

export default function Page() {
  const [stepForm, setStepForm] = useState(0);
  const [firstData, setFirstData] = useState<RegisterStepOne>({} as RegisterStepOne);
  const [secondData, setSecondData] = useState<RegisterStepTwo>({} as RegisterStepTwo);
  const router = useRouter();

  useEffect(() => {
    if (stepForm === 1) {
      const data = Object.assign(firstData, secondData);
      console.log(data);
      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }, [secondData])

  return (
    <section className={s.wrapperRegister}>
      <Image
        src="/mercatto-logo.png"
        alt="Mercatto Logo"
        width={120}
        height={120}
        priority
      />
      <h1>CRIAR CONTA</h1>
      <RegisterStepForm stepForm={stepForm} />
      <div className={s.wrapperRegisterForm}>
        {stepForm === 0 && <StepOne step={setStepForm} setData={setFirstData} data={firstData} />}
        {stepForm === 1 && <StepTwo step={setStepForm} setData={setSecondData}/>}
      </div>
    </section>
  );
}
