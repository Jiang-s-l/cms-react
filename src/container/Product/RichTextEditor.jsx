import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from 'html-to-draftjs';

export default class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  getRichText(){
    const { editorState } = this.state;
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }

  setRichText(html){
    console.log("进入到设置富文本");
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState,
      });
    }
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          // wrapperClassName="demo-wrapper"//最外侧容器样式
          // editorClassName="demo-editor"//编辑区域样式
          editorStyle={{
            border: "1px solid rgb(111, 111, 108)",
            lineHeight: "10px",
            minHeight: "200px",
            paddingLeft: "10px",
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}
