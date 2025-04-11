import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

<PhoneInput
  country="ge" // Use the two-letter country code for Georgia
  value={form.control.getValues("phone")} // Get value from the form
  onChange={(value) => form.control.setValue("phone", value)} // Update form value
  placeholder="(555) 123-4567"
/>;
