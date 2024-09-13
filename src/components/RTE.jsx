import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
const RTE = ({ name, control, label, defaultValue = '' }) => {
    return (
        <div className="w-full">
            {label && <label className="mb-1 inline-block pl-1">{label}</label>}
            <Controller
                control={control}
                name={name || 'content'}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey={import.meta.env.VITE_TINYMCE_KEY}
                        initialValue={defaultValue}
                        init={{
                            branding: false,
                            selector: '#myTextarea',
                            // skin: 'oxide-dark',
                            // content_css: 'dark',
                            // skin: window.matchMedia(
                            //     '(prefers-color-scheme: dark)',
                            // ).matches
                            //     ? 'oxide-dark'
                            //     : 'oxide',
                            // content_css: window.matchMedia(
                            //     '(prefers-color-scheme: dark)',
                            // ).matches
                            //     ? 'dark'
                            //     : 'default',
                            placeholder: 'Tell your story here...',
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist',
                                'autolink',
                                'lists',
                                'link',
                                'image',
                                'charmap',
                                'preview',
                                'anchor',
                                'searchreplace',
                                'visualblocks',
                                'code',
                                'fullscreen',
                                'insertdatetime',
                                'media',
                                'table',
                                'code',
                                'help',
                                'wordcount',
                            ],
                            toolbar:
                                'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style:
                                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
};

export default RTE;
