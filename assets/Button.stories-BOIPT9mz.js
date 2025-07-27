const u=({label:l,onClick:i})=>React.createElement("button",{onClick:i,style:{backgroundColor:"#007bff",color:"#fff",padding:"10px 16px",border:"none",borderRadius:"4px",fontSize:"16px",cursor:"pointer"}},l),d={title:"Components/Button",component:u,tags:["autodocs"]},e={args:{label:"Click Me"}},t={args:{label:"With Action",onClick:()=>alert("Button clicked!")}};var o,r,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    label: 'Click Me'
  }
}`,...(n=(r=e.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};var a,s,c;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    label: 'With Action',
    onClick: () => alert('Button clicked!')
  }
}`,...(c=(s=t.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};const p=["Default","WithAction"];export{e as Default,t as WithAction,p as __namedExportsOrder,d as default};
