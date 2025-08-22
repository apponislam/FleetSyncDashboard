import { useState, useRef, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import JoditEditor from "jodit-react";
import { toast } from "sonner";
import { useGetPublicContentQuery, useUpdatePublicContentMutation } from "../../../redux/features/settings/publicApi";

export const PrivatePolicy = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState("");

    // Use the Redux query hook with 'privacy-policy' type
    const { data: contentData, isLoading, refetch } = useGetPublicContentQuery("privacy-policy");
    const [updatePublicContent, { isLoading: isUpdating }] = useUpdatePublicContentMutation();

    const editor = useRef(null);

    // Set content when data is loaded
    useEffect(() => {
        if (contentData) {
            setContent(contentData.content || "No privacy policy content available. Please edit to add content.");
        }
    }, [contentData]);

    const handleSave = async () => {
        try {
            await updatePublicContent({
                type: "privacy-policy",
                content: content,
            }).unwrap();

            toast.success("Privacy policy updated successfully");
            setIsEditing(false);
            refetch(); // Refresh the data
        } catch (error) {
            console.error("Failed to save privacy policy:", error);
            toast.error("Failed to save privacy policy");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset to original content
        if (contentData) {
            setContent(contentData.content || "");
        }
    };

    const config = {
        readonly: false,
        placeholder: "Start typing privacy policy content...",
        buttons: ["bold", "italic", "underline", "link", "unlink", "ul", "ol", "font", "fontsize"],
        height: 400,
        theme: "default",
    };

    if (isLoading) {
        return (
            <div>
                <div className="flex items-center my-10 text-2xl">
                    <Link to={"/settings"} className="text-xl">
                        <FaArrowLeft className="text-[#00A430] mr-2 cursor-pointer" />
                    </Link>
                    <h2 className="text-[#00A430] font-semibold">Privacy Policy</h2>
                </div>
                <div className="bg-white shadow rounded-2xl p-6 md:p-12 text-gray-600 md:text-lg font-medium">
                    <div className="flex justify-center items-center h-40">
                        <p>Loading privacy policy...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center my-10 text-2xl">
                <Link to={"/settings"} className="text-xl">
                    <FaArrowLeft className="text-[#00A430] mr-2 cursor-pointer" />
                </Link>
                <h2 className="text-[#00A430] font-semibold">Privacy Policy</h2>
            </div>

            <div className="bg-white shadow rounded-2xl p-6 md:p-12 text-gray-600 md:text-lg font-medium">
                {isEditing ? (
                    <>
                        <div className="space-y-4">
                            <label className="block font-semibold">Privacy Policy Content:</label>
                            <JoditEditor ref={editor} value={content} config={config} onBlur={(newContent) => setContent(newContent)} />
                        </div>

                        <div className="flex gap-4 justify-end mt-6">
                            <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-xl font-medium">
                                Cancel
                            </button>
                            <button onClick={handleSave} disabled={isUpdating} className="bg-[#00A430] hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium disabled:bg-gray-400 disabled:cursor-not-allowed">
                                {isUpdating ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="self-stretch text-justify justify-start md:leading-7 tracking-tight whitespace-pre-line" dangerouslySetInnerHTML={{ __html: content }} />

                        <div className="flex justify-end mt-6">
                            <button onClick={() => setIsEditing(true)} className="bg-[#00A430] hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium">
                                Edit Details
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
