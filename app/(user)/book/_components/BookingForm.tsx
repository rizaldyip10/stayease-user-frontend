"use client";

import * as yup from "yup";
import {Form, Formik, FormikValues} from "formik";
import {Button} from "@/components/ui/button";
import UserStayingDataForm from "@/app/(user)/book/_components/UserStayingDataForm";
import SpecialRequest from "@/app/(user)/book/_components/SpecialRequest";
import {whiteSpaceRegex} from "@/constants/WhiteSpaceRegex";
import PaymentMethodForm from "@/app/(user)/book/_components/PaymentMethodForm";
import CancellationPolicy from "@/app/(user)/book/_components/CancellationPolicy";

const BookingForm = () => {
    const bookingSchema = yup.object().shape({
        checkInDate: yup.date().required("Please enter valid check-in date"),
        checkOutDate: yup.date().required("Please enter valid check-out date"),
        totalAdults: yup.number().min(1, "There has to be a guest").required("Please enter guest number"),
        totalChildren:  yup.number(),
        totalInfants:  yup.number(),
        checkInTime: yup.date().nullable(),
        checkOutTime: yup.date().nullable(),
        nonSmokingRoom: yup.boolean(),
        other: yup.string().min(3, "Please enter valid request").matches(whiteSpaceRegex, "Please enter valid request"),
        paymentMethod: yup.string().required("Please select payment method"),
        bank: yup.string().nullable(),
    });

    const initialValues: FormikValues = {
        checkInDate: null,
        checkOutDate: null,
        totalAdults: 1,
        totalChildren: 0,
        totalInfants: 0,
        checkInTime: null,
        checkOutTime: null,
        nonSmokingRoom: false,
        paymentMethod: "manual_transfer",
        bank: null,
    };

    const handleBooking = async (value: FormikValues) => {
        console.log("handleBooking called", value);
    };

    return (
        <div className="w-full flex flex-col gap-3">
            <Formik
                initialValues={initialValues}
                validationSchema={bookingSchema}
                onSubmit={async (value) => {
                    await handleBooking(value);
                }}
            >
                {(formik) => (
                    <Form className="w-full flex flex-col gap-5">
                        <UserStayingDataForm/>
                        <SpecialRequest/>
                        <PaymentMethodForm/>
                        <CancellationPolicy/>
                        <Button
                            type="submit"
                            className="bg-blue-950 text-white"
                            onClick={() => console.log("Button clicked")}
                        >
                            Pay and Continue
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BookingForm;