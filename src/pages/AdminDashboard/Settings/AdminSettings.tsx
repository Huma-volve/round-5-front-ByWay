import AdminCategories from "../../../components/AdminDashboard/AdminSettings/AdminCategories";
import SettingsCard from "../../../components/AdminDashboard/AdminSettings/SettingsCard";
import SettingsGroup from "../../../components/AdminDashboard/AdminSettings/SettingsGroup";

function AdminSettings() {
  return (
    <div>
      <SettingsCard header="Commission Settings">
        <SettingsGroup
          field="commission"
          placeholder="15"
          text="Note: This percentage will be deducted from instructor revenue for each course sold."
          mark="%"
        ></SettingsGroup>
      </SettingsCard>

      <SettingsCard header="Withdrawal Policy">
        <SettingsGroup
          field="withdrawal"
          placeholder="25"
          text="Note: Instructors can only request payouts when their available balance exceeds this amount."
          mark="$"
        ></SettingsGroup>
      </SettingsCard>

      <SettingsCard header="Course Categories Management">
            <AdminCategories/>
      </SettingsCard>

    </div>
  );
}
export default AdminSettings;
