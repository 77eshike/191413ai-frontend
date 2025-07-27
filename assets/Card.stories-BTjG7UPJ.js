import{R as e}from"./index-B2-qRKKC.js";import{B as u}from"./Button-CT9-678g.js";import"./_commonjsHelpers-Cpj98o6Y.js";const m=({title:p,description:l,footer:a})=>e.createElement("div",{className:"border rounded-xl p-4 shadow-md bg-white max-w-sm"},e.createElement("h3",{className:"text-lg font-semibold mb-2"},p),e.createElement("p",{className:"text-gray-600 mb-4"},l),a&&e.createElement("div",{className:"pt-2 border-t mt-2"},a));m.__docgenInfo={description:"",methods:[],displayName:"Card",props:{title:{required:!0,tsType:{name:"string"},description:""},description:{required:!0,tsType:{name:"string"},description:""},footer:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const N={title:"Components/Card",component:m,tags:["autodocs"]},t={args:{title:"卡片标题",description:"这是卡片的说明文字内容，支持多行展示。"}},r={args:{title:"带底部操作的卡片",description:"说明文字段落。",footer:React.createElement(u,{label:"了解更多"})}};var o,s,c;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    title: '卡片标题',
    description: '这是卡片的说明文字内容，支持多行展示。'
  }
}`,...(c=(s=t.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};var i,n,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    title: '带底部操作的卡片',
    description: '说明文字段落。',
    footer: <Button label="了解更多" />
  }
}`,...(d=(n=r.parameters)==null?void 0:n.docs)==null?void 0:d.source}}};const R=["Default","WithFooter"];export{t as Default,r as WithFooter,R as __namedExportsOrder,N as default};
