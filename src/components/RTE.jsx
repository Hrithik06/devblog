import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
const RTE = () => {
    return (
        <Editor
            apiKey={import.meta.env.VITE_TINYMCE_KEY}
            initialValue="default value"
            init={{
                branding: false,
                // skin: 'oxide-dark',
                // content_css: 'dark',
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
        />
    );
};

export default RTE;
