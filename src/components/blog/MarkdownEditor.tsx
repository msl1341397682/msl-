import React from 'react';
import MDEditor from '@uiw/react-md-editor';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  return (
    <div className="markdown-editor" data-color-mode="light">
      <MDEditor
        value={value}
        onChange={onChange}
        height={400}
        preview="edit"
        hideToolbar={false}
      />
         
      <style jsx>{`
        .markdown-editor .w-md-editor {
          border-radius: 0.375rem;
          border: 1px solid #e2e8f0;
        }
        html.dark .markdown-editor {
          data-color-mode: dark;
        }
        html.dark .markdown-editor .w-md-editor {
          border-color: #374151;
        }
      `}</style>
    </div>
  );
};

export default MarkdownEditor;