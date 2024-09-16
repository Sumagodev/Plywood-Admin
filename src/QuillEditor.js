import React, { useEffect, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill'

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ script: 'sub' }, { script: 'super' }],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['clean']
    ]
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'script',
    'color', 'background',
    'font', 'align'
]


export default function QuillEditor({ handleChange, value }) {
    const [quillValue, setQuillValue] = useState(value ? value : "")
    useEffect(() => {
        if (value) {
            setQuillValue(value)
        } else {
            setQuillValue("")
        }
    }, [value])

    return (
        <>
            <ReactQuill
                theme="snow"
                value={quillValue}
                style={{ height: 400 }}
                scrollingContaine={{ height: 400 }}
                onChange={(e) => { setQuillValue(e); handleChange(e) }}
                placeholder={"Write something awesome..."}
                modules={modules}
                formats={formats}
            />
        </>
    )
}
