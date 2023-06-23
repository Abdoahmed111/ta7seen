import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Input from "./Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

type FromValues = {
  weekStart: string;
  readingAmount: number;
  readingStart: number;
  listeningAmount: number;
  ListeningStart: number;
  newAmount: number;
  newStart: number;
  nearReviewAmount: number;
  farReviewAmount: number;
};

const WeekForm = () => {
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const schema = z.object({
    weekStart: z.any(),
    readingAmount: z
      .number()
      .min(0, "قيمة القراءة يجب أن تكون أكبر من أو تساوي صفر"),
    readingStart: z
      .number()
      .min(0, "قيمة بداية القراءة يجب أن تكون أكبر من أو تساوي صفر"),
    listeningAmount: z
      .number()
      .min(0, "قيمة الاستماع يجب أن تكون أكبر من أو تساوي صفر"),
    ListeningStart: z
      .number()
      .min(0, "قيمة بداية الاستماع يجب أن تكون أكبر من أو تساوي صفر"),
    newAmount: z
      .number()
      .min(0, "قيمة حفظ الجديد يجب أن تكون أكبر من أو تساوي صفر"),
    newStart: z
      .number()
      .min(0, "قيمة بداية الحفظ يجب أن تكون أكبر من أو تساوي صفر"),
    nearReviewAmount: z
      .number()
      .min(0, "قيمة التعاهد القريب يجب أن تكون أكبر من أو تساوي صفر"),
    farReviewAmount: z
      .number()
      .min(0, "قيمة التعاهد البعيد يجب أن تكون أكبر من أو تساوي صفر"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FromValues>({
    defaultValues: {
      weekStart: "",
      readingAmount: 0,
      readingStart: 0,
      listeningAmount: 0,
      ListeningStart: 0,
      newAmount: 0,
      newStart: 0,
      nearReviewAmount: 0,
      farReviewAmount: 0,
    },
    resolver: zodResolver(schema),
  });
  const generateWeek = api.createWeek.generateWeek.useMutation({
    onSuccess(data) {
      setSuccess(true);
      setTimeout(() => {
        void router.push("/weeks");
      }, 3000);
    },
  });

  const onSubmit: SubmitHandler<FromValues> = (data) => {
    generateWeek.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {success && (
        <div className="alert alert-success mb-5">
          <span>تم انشاء الجدول بنجاح، سيتم توجيهك الآن الي صفحة وردك</span>
        </div>
      )}
      <h4 className="my-2 text-xl text-primary">معلومات عامة</h4>
      <div className="mb-10 grid grid-cols-3 gap-3">
        <Input
          labelAlt={""}
          type="date"
          label="بداية الاسبوع"
          error={errors.weekStart ? errors.weekStart.message : ""}
          className={errors.weekStart ? "input-error" : ""}
          {...register("weekStart", { valueAsDate: true })}
        />
      </div>

      <h4 className="my-2 text-xl text-primary">
        بيانات حصن القراءة و الاستماع
      </h4>
      <div className="grid grid-cols-4 gap-3">
        <Input
          labelAlt={"عدد الصفحات"}
          type="number"
          min="0"
          label="مقدار القراءة"
          error={errors.readingAmount ? errors.readingAmount.message : ""}
          className={errors.readingAmount ? "input-error" : ""}
          {...register("readingAmount", { valueAsNumber: true })}
        />

        <Input
          labelAlt={"رقم الصفحة"}
          type="number"
          min="0"
          label="بداية القراءة"
          error={errors.readingStart ? errors.readingStart.message : ""}
          className={errors.readingStart ? "input-error" : ""}
          {...register("readingStart", { valueAsNumber: true })}
        />

        <Input
          labelAlt={"عدد الصفحات"}
          type="number"
          min="0"
          label="مقدار الاستماع"
          error={errors.listeningAmount ? errors.listeningAmount.message : ""}
          className={errors.listeningAmount ? "input-error" : ""}
          {...register("listeningAmount", { valueAsNumber: true })}
        />

        <Input
          labelAlt={"رقم الصفحة"}
          type="number"
          min="0"
          label="بداية الاستماع"
          error={errors.ListeningStart ? errors.ListeningStart.message : ""}
          className={errors.ListeningStart ? "input-error" : ""}
          {...register("ListeningStart", { valueAsNumber: true })}
        />
      </div>

      <h4 className="my-2 text-xl text-primary">بيانات حصن الجديد</h4>
      <div className="grid grid-cols-4 gap-3">
        <Input
          labelAlt={"عدد الصفحات"}
          type="number"
          min="0"
          label="مقدار حفظ الجديد"
          error={errors.newAmount ? errors.newAmount.message : ""}
          className={errors.newAmount ? "input-error" : ""}
          {...register("newAmount", { valueAsNumber: true })}
        />

        <Input
          labelAlt={"رقم الصفحة"}
          type="number"
          min="0"
          label="بداية الحفظ"
          error={errors.newStart ? errors.newStart.message : ""}
          className={errors.newStart ? "input-error" : ""}
          {...register("newStart", { valueAsNumber: true })}
        />
      </div>

      <h4 className="my-2 text-xl text-primary">
        بيانات حصن التعاهد القريب والبعيد
      </h4>
      <div className="grid grid-cols-4 gap-3">
        <Input
          labelAlt={"عدد الصفحات"}
          type="number"
          min="0"
          label="مقدار التعاهد القريب"
          error={errors.nearReviewAmount ? errors.nearReviewAmount.message : ""}
          className={errors.nearReviewAmount ? "input-error" : ""}
          {...register("nearReviewAmount", { valueAsNumber: true })}
        />

        <Input
          labelAlt={"عدد الصفحات"}
          type="number"
          min="0"
          label="مقدار التعاهد  البعيد"
          error={errors.farReviewAmount ? errors.farReviewAmount.message : ""}
          className={errors.farReviewAmount ? "input-error" : ""}
          {...register("farReviewAmount", { valueAsNumber: true })}
        />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary btn">
        {isSubmitting ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          "إنشاء الجدول"
        )}
      </button>
    </form>
  );
};

export default WeekForm;
