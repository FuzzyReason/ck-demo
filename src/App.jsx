import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { createClient } from "@supabase/supabase-js";

import {
	ClassicEditor,
	AccessibilityHelp,
	Alignment,
	Autoformat,
	AutoImage,
	AutoLink,
	Autosave,
	BalloonToolbar,
	Bold,
	CKBox,
	CKBoxImageEdit,
	CloudServices,
	Code,
	Essentials,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	Heading,
	Highlight,
	ImageBlock,
	ImageCaption,
	ImageInline,
	ImageInsert,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	LinkImage,
	List,
	ListProperties,
	Mention,
	PageBreak,
	Paragraph,
	PasteFromOffice,
	PictureEditing,
	RemoveFormat,
	SelectAll,
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText,
	Strikethrough,
	Subscript,
	Superscript,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TextTransformation,
	TodoList,
	Underline,
	Undo
} from 'ckeditor5';
import {
	AIAssistant,
	Comments,
	DocumentOutline,
	ExportPdf,
	ExportWord,
	FormatPainter,
	MultiLevelList,
	OpenAITextAdapter,
	PasteFromOfficeEnhanced,
	PresenceList,
	RealTimeCollaborativeComments,
	RealTimeCollaborativeEditing,
	RealTimeCollaborativeRevisionHistory,
	RealTimeCollaborativeTrackChanges,
	RevisionHistory,
	SlashCommand,
	TableOfContents,
	TrackChanges,
	TrackChangesData
} from 'ckeditor5-premium-features';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

import './App.css';

const supabase = createClient("", "");
// const AI_AUTH_TOKEN = '';
const AI_AUTH_TOKEN = '';
const LICENSE_KEY = '';
const CKBOX_TOKEN_URL = '';
const UNIQUE_CHANNEL_PER_DOCUMENT = '';
const CLOUD_SERVICES_TOKEN_URL = '';
const CLOUD_SERVICES_WEBSOCKET_URL = '';

const handleSave = async (editor) => {
	// Pull first, compare the doc versoin, save
	try {
		const { data, error } = await supabase.from('documents').insert([
		  {
			name: editor.getData().substring(3, 10), 
			content: editor.getData(),
			uploaded_at: new Date(),
			document_version: editor.plugins.get( 'RealTimeCollaborationClient' ).cloudDocumentVersion,
		  },
		]);
	if (error) throw error;
	console.log('Document saved successfully!');
  } catch (err) {
	console.error(err);
	console.log('Error saving document.');
  }
};

export default function App() {
	const editorPresenceRef = useRef(null);
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const editorAnnotationsRef = useRef(null);
	const editorRevisionHistoryRef = useRef(null);
	const editorRevisionHistoryEditorRef = useRef(null);
	const editorRevisionHistorySidebarRef = useRef(null);
	const editorOutlineRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);
	const [editorData, setEditorData] = useState('');
	const [documents, setDocuments] = useState([]);

  
	const fetchDocuments = async () => {
	  try {
		const { data, error } = await supabase
		  .from('documents')
		  .select('*')
		if (error) throw error;
		setDocuments(data);
	  } catch (err) {
		console.error(err);
		console.log('Error fetching documents.');
	  }
	};

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const editorConfig = {
		toolbar: {
			items: [
				'undo',
				'redo',
				'|',
				'revisionHistory',
				'trackChanges',
				'comment',
				'commentsArchive',
				'|',
				'aiCommands',
				'aiAssistant',
				'|',
				'exportWord',
				'exportPdf',
				'formatPainter',
				'|',
				'heading',
				'|',
				'fontSize',
				'fontFamily',
				'fontColor',
				'fontBackgroundColor',
				'|',
				'bold',
				'italic',
				'underline',
				'strikethrough',
				'subscript',
				'superscript',
				'code',
				'removeFormat',
				'|',
				'specialCharacters',
				'pageBreak',
				'link',
				'insertImage',
				'insertImageViaUrl',
				'ckbox',
				'insertTable',
				'tableOfContents',
				'highlight',
				'|',
				'alignment',
				'|',
				'bulletedList',
				'numberedList',
				'multiLevelList',
				'todoList',
				'outdent',
				'indent'
			],
			shouldNotGroupWhenFull: false
		},
		plugins: [
			AccessibilityHelp,
			AIAssistant,
			Alignment,
			Autoformat,
			AutoImage,
			AutoLink,
			Autosave,
			BalloonToolbar,
			Bold,
			CKBox,
			CKBoxImageEdit,
			CloudServices,
			Code,
			Comments,
			DocumentOutline,
			Essentials,
			ExportPdf,
			ExportWord,
			FontBackgroundColor,
			FontColor,
			FontFamily,
			FontSize,
			FormatPainter,
			Heading,
			Highlight,
			ImageBlock,
			ImageCaption,
			ImageInline,
			ImageInsert,
			ImageInsertViaUrl,
			ImageResize,
			ImageStyle,
			ImageTextAlternative,
			ImageToolbar,
			ImageUpload,
			Indent,
			IndentBlock,
			Italic,
			Link,
			LinkImage,
			List,
			ListProperties,
			Mention,
			MultiLevelList,
			OpenAITextAdapter,
			PageBreak,
			Paragraph,
			PasteFromOffice,
			PasteFromOfficeEnhanced,
			PictureEditing,
			PresenceList,
			RealTimeCollaborativeComments,
			RealTimeCollaborativeEditing,
			RealTimeCollaborativeRevisionHistory,
			RealTimeCollaborativeTrackChanges,
			RemoveFormat,
			RevisionHistory,
			SelectAll,
			SlashCommand,
			SpecialCharacters,
			SpecialCharactersArrows,
			SpecialCharactersCurrency,
			SpecialCharactersEssentials,
			SpecialCharactersLatin,
			SpecialCharactersMathematical,
			SpecialCharactersText,
			Strikethrough,
			Subscript,
			Superscript,
			Table,
			TableCaption,
			TableCellProperties,
			TableColumnResize,
			TableOfContents,
			TableProperties,
			TableToolbar,
			TextTransformation,
			TodoList,
			TrackChanges,
			TrackChangesData,
			Underline,
			Undo
		],
		ai: {
			openAI: {
				// apiUrl: AI_API_URL,
				requestHeaders: {
					Authorization: AI_AUTH_TOKEN
				},
				requestParameters: {
					model: 'gpt-3.5-turbo-1106',
					max_tokens: 4000
				}
			},
			aiAssistant: {
				contentAreaCssClass: 'formatted'
			}
		},
		autosave: {
			save: async editor => {
				return handleSave( editor );
			}
		},
		balloonToolbar: ['comment', '|', 'aiAssistant', '|', 'bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
		ckbox: {
			tokenUrl: CKBOX_TOKEN_URL
		},
		cloudServices: {
			tokenUrl: CLOUD_SERVICES_TOKEN_URL,
			webSocketUrl: CLOUD_SERVICES_WEBSOCKET_URL
		},
		collaboration: {
			channelId: UNIQUE_CHANNEL_PER_DOCUMENT
		},
		comments: {
			editorConfig: {
				extraPlugins: [Bold, Italic, Mention],
				mention: {
					feeds: [
						{
							marker: '@',
							feed: [
								/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#comments-with-mentions */
							]
						}
					]
				}
			}
		},
		documentOutline: {
			container: editorOutlineRef.current
		},
		exportPdf: {
			stylesheets: [
				/* This path should point to application stylesheets. */
				/* See: https://ckeditor.com/docs/ckeditor5/latest/features/converters/export-pdf.html */
				'./App.css',
				/* Export PDF needs access to stylesheets that style the content. */
				'https://cdn.ckeditor.com/ckeditor5/43.3.1/ckeditor5.css',
				'https://cdn.ckeditor.com/ckeditor5-premium-features/43.3.1/ckeditor5-premium-features.css'
			],
			fileName: 'export-pdf-demo.pdf',
			converterOptions: {
				format: 'Tabloid',
				margin_top: '20mm',
				margin_bottom: '20mm',
				margin_right: '24mm',
				margin_left: '24mm',
				page_orientation: 'portrait'
			}
		},
		exportWord: {
			stylesheets: [
				/* This path should point to application stylesheets. */
				/* See: https://ckeditor.com/docs/ckeditor5/latest/features/converters/export-word.html */
				'./App.css',
				/* Export Word needs access to stylesheets that style the content. */
				'https://cdn.ckeditor.com/ckeditor5/43.3.1/ckeditor5.css',
				'https://cdn.ckeditor.com/ckeditor5-premium-features/43.3.1/ckeditor5-premium-features.css'
			],
			fileName: 'export-word-demo.docx',
			converterOptions: {
				document: {
					orientation: 'portrait',
					size: 'Tabloid',
					margins: {
						top: '20mm',
						bottom: '20mm',
						right: '24mm',
						left: '24mm'
					}
				}
			}
		},
		fontFamily: {
			supportAllValues: true
		},
		fontSize: {
			options: [10, 12, 14, 'default', 18, 20, 22],
			supportAllValues: true
		},
		heading: {
			options: [
				{
					model: 'paragraph',
					title: 'Paragraph',
					class: 'ck-heading_paragraph'
				},
				{
					model: 'heading1',
					view: 'h1',
					title: 'Heading 1',
					class: 'ck-heading_heading1'
				},
				{
					model: 'heading2',
					view: 'h2',
					title: 'Heading 2',
					class: 'ck-heading_heading2'
				},
				{
					model: 'heading3',
					view: 'h3',
					title: 'Heading 3',
					class: 'ck-heading_heading3'
				},
				{
					model: 'heading4',
					view: 'h4',
					title: 'Heading 4',
					class: 'ck-heading_heading4'
				},
				{
					model: 'heading5',
					view: 'h5',
					title: 'Heading 5',
					class: 'ck-heading_heading5'
				},
				{
					model: 'heading6',
					view: 'h6',
					title: 'Heading 6',
					class: 'ck-heading_heading6'
				}
			]
		},
		image: {
			toolbar: [
				'toggleImageCaption',
				'imageTextAlternative',
				'|',
				'imageStyle:inline',
				'imageStyle:wrapText',
				'imageStyle:breakText',
				'|',
				'resizeImage',
				'|',
				'ckboxImageEdit'
			]
		},
		licenseKey: LICENSE_KEY,
		link: {
			addTargetToExternalLinks: true,
			defaultProtocol: 'https://',
			decorators: {
				toggleDownloadable: {
					mode: 'manual',
					label: 'Downloadable',
					attributes: {
						download: 'file'
					}
				}
			}
		},
		list: {
			properties: {
				styles: true,
				startIndex: true,
				reversed: true
			}
		},
		mention: {
			feeds: [
				{
					marker: '@',
					feed: [
						/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
					]
				}
			]
		},
		menuBar: {
			isVisible: true
		},
		placeholder: 'Type or paste your content here!',
		presenceList: {
			container: editorPresenceRef.current
		},
		revisionHistory: {
			editorContainer: editorContainerRef.current,
			viewerContainer: editorRevisionHistoryRef.current,
			viewerEditorElement: editorRevisionHistoryEditorRef.current,
			viewerSidebarContainer: editorRevisionHistorySidebarRef.current,
			resumeUnsavedRevision: true
		},
		sidebar: {
			container: editorAnnotationsRef.current
		},
		table: {
			contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
		},
		initialData: '<p>Lorem Ipsum</p>'
	};

	return (
		<div>
			<div className="main-container">
				<div className="presence" ref={editorPresenceRef}></div>
				<div className="editor-container editor-container_classic-editor editor-container_include-annotations" ref={editorContainerRef}>
					<div className="editor-container__editor-wrapper">
						<div className="editor-container__sidebar">
							<div ref={editorOutlineRef}></div>
						</div>
						<div className="editor-container__editor">
							<div ref={editorRef}>{isLayoutReady && 
								<CKEditor 
									editor={ClassicEditor} 
									config={editorConfig}         
									onChange={(event, editor) => {
          								const data = editor.getData();
          								setEditorData(data);
										const a = editor.plugins.get( 'RealTimeCollaborationClient' ).cloudDocumentVersion
									}} 
								/>
							}</div>
						</div>
						<div className="editor-container__sidebar">
							<div ref={editorAnnotationsRef}></div>
						</div>
					</div>
				</div>
				<div className="revision-history" ref={editorRevisionHistoryRef}>
					<div className="revision-history__wrapper">
						<div className="revision-history__editor" ref={editorRevisionHistoryEditorRef}></div>
						<div className="revision-history__sidebar" ref={editorRevisionHistorySidebarRef}></div>
					</div>
				</div>
			</div>
			<div style={{ marginTop: '20px' }}>
        <button onClick={fetchDocuments}>Fetch Documents</button>
      </div>
      <div style={{ marginTop: '30px' }}>
        <h2>Documents:</h2>
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <p>{doc.name}</p>
            </li>
          ))}
        </ul>
      </div>
		</div>
	);
}

