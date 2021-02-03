import React, { Component } from 'react';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

class QuillEditor extends Component {

    constructor (props) {

      super(props)

      this.state = { editorHtml: props.defaultValue }
      this.handleChange = this.handleChange.bind(this)

      this.modules = {
        toolbar: [
          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['code-block'],
          ['clean']
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        }
      }

      this.formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'code-block'
      ]
    }
    
    handleChange (html, delta, source, editor) {
        this.setState({ editorHtml: html });
        //console.log(editor.getHTML());
        this.props.addArticle(editor.getHTML());
    }
    
    render () {
      return (

        <div>

          
              <ReactQuill 
                onChange={this.handleChange}
                value={this.state.editorHtml}
                modules={this.modules}
                formats={this.formats}
                bounds={'.app'}
                placeholder={this.props.placeholder}
                style={{color: '#FFF'}}
              />

          

         </div>
       )
    }
  }

export default QuillEditor;