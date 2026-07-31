import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/shared/PageHeader";
import ActivityHeatmap from "../components/analytics/ActivityHeatmap";

const Analytics = () => {

    return (

        <DashboardLayout>

            <PageHeader
                title="Analytics"
                subtitle="Understand your gambling behaviour through insights."
            />

            <div className="space-y-8">

                <ActivityHeatmap />
                
            </div>

        </DashboardLayout>

    );

};

export default Analytics;