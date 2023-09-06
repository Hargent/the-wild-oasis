import Heading from "../../components/heading/heading";
import Row from "../../components/row/row";
import UpdateSettingsForm from "../../features/settings/update-settings-form";

function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
