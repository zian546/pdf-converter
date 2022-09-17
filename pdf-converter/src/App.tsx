import React from "react";
import "./App.css";

type State = {
  File: File | null;
  convertedFile: any;
  fileContent: any;
};

const PDFTYPE = "application/pdf";
const PDFEXT = ".pdf";
const DOCXEXT = ".docx";
const DOCXTYPE =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

class App extends React.Component {
  constructor(props: any) {
    super(props);

    this.getFileHandler = this.getFileHandler.bind(this);
    this.updateFileContent = this.updateFileContent.bind(this);
    this.state = {
      File: null,
      convertedFile: null,
      fileContent: null,
    };
  }

  state: State = {
    File: null,
    convertedFile: null,
    fileContent: null,
  };

  getFileHandler(event: any): void {
    if (event.target.files.length === 0) return;
    else {
      event.target.files[0].name.includes(DOCXEXT) ||
      event.target.files[0].type === DOCXTYPE
        ? this.updateFileAndName(event.target.files[0])
        : alert("please insert a docx file");
    }
  }

  updateFileContent() {
    const reader = new FileReader();
    const contentAsBuffer = this.state.File?.arrayBuffer().then((content) => {
      const contentAsBlob = new Blob([content]);
      console.log(contentAsBlob);
    });
  }

  updateFileAndName(newFile: any) {
    this.updateFile(newFile);
    this.updateFileName(newFile.name);
    this.updateFileContent();
  }

  updateFile(newFile: any) {
    this.setState({ File: newFile });
  }

  updateFileName(newFileName: string): void {
    this.setState({ filename: newFileName });
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.getFileHandler}></input>
        File to be converted: {this.state.File?.name}
        <button type="submit" onClick={this.updateFileContent}>
          Convert
        </button>
      </div>
    );
  }
}

export default App;
