import { useParams } from "react-router-dom";
import { FormRenderer } from "../../components/FormRenderer";
import { useFormProgress } from "../../hooks/useFormProgress";

export default function FormPage() {
  const { clientId } = useParams<{ clientId: string }>();

  // Call hook unconditionally
  const { data, save, loading, saving } = useFormProgress(clientId ?? "");

  if (!clientId) return <p>No client selected</p>;
  if (loading) return <p>Loading form...</p>;

  return (
    <>
      <FormRenderer initialData={data} onSubmit={save} />
      {saving && <p className="text-sm text-gray-500 mt-2">Saving...</p>}
    </>
  );
}
