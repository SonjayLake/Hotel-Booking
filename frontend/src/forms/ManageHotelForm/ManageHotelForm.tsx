import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  startRating: number;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
  starRating: number;
};

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10">
        <HotelDetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
