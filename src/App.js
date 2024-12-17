import React, {useState} from 'react';
import {fileOpen, fileSave, directoryOpen} from 'browser-fs-access';

function App() {
    const [fileContent, setFileContent] = useState("");
    const [filesList, setFilesList] = useState([]);

    // 打开文件
    const handleOpenFile = async () => {
        try {
            const file = await fileOpen({
                mimeTypes: ['text/plain'],
                description: 'Text Files',
                extensions: ['.txt'],
            });

            const content = await file.text();
            setFileContent(content);
        } catch (err) {
            console.error("Error reading file:", err);
        }
    };

    // 保存文件
    const handleSaveFile = async () => {
        try {
            const blob = new Blob([fileContent], {type: 'text/plain'});
            await fileSave(blob, {
                fileName: 'example.txt',
                description: 'Text File',
                extensions: ['.txt'],
            });
            alert("File saved successfully!");
        } catch (err) {
            console.error("Error saving file:", err);
        }
    };

    // 打开目录
    const handleOpenDirectory = async () => {
        try {
            const files = await directoryOpen({recursive: true});
            setFilesList(files.map(file => file.name));
        } catch (err) {
            console.error("Error opening directory:", err);
        }
    };

    return (
        <div style={{padding: "20px", fontFamily: "Arial, sans-serif"}}>
            <h1>Browser FS Access - React Demo</h1>

            {/* 打开文件按钮 */}
            <button onClick={handleOpenFile} style={{marginRight: "10px"}}>打开文件</button>

            {/* 保存文件按钮 */}
            <button onClick={handleSaveFile} style={{marginRight: "10px"}}>保存文件</button>

            {/* 打开目录按钮 */}
            <button onClick={handleOpenDirectory}>打开目录</button>

            {/* 文件内容显示 */}
            <div style={{marginTop: "20px"}}>
                <h3>文件内容：</h3>
                <textarea
                    rows="10"
                    cols="60"
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                    placeholder="文件内容会显示在这里..."
                />
            </div>

            {/* 目录文件列表显示 */}
            <div style={{marginTop: "20px"}}>
                <h3>目录文件列表：</h3>
                <ul>
                    {filesList.map((file, index) => (
                        <li key={index}>{file}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;