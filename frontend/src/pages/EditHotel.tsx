import { useParams } from "react-router-dom";
import * as apiClient from "../api-clients";
import { useMutation, useQuery } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

function EditHotel() {
  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {},
    onError: () => {},
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    { enabled: !!hotelId }
  );
  return (
    <ManageHotelForm onSave={handleSave} isLoading={isLoading} hotel={hotel} />
  );
}

export default EditHotel;
