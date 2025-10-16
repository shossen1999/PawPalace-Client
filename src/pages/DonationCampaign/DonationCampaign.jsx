import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import DonateCard from "./Components/DonateCard";

const DonationCampaign = () => {
    const axiosPublic = useAxiosPublic()
    const { data: donations = [] } = useQuery({
        queryKey: ['pets'],
        queryFn: async () => {
            const res = await axiosPublic.get('/donation-camps')
            return res.data;
        }
    })
    const sortedDonations = donations.slice().sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold my-12">Donate For Pet</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
                {
                    sortedDonations.map(donation => <DonateCard key={donation._id} donation={donation}></DonateCard>)
                }
            </div>
        </div>
    );
};

export default DonationCampaign;