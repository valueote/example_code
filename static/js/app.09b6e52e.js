(function(){"use strict";var e={5274:function(e,t,o){var s=o(3751),n=o(641);const r={class:"min-h-screen bg-gray-50 flex items-center justify-center"};function a(e,t,o,a,i,l){const c=(0,n.g2)("Login"),d=(0,n.g2)("Register"),u=(0,n.g2)("ChatInterface");return(0,n.uX)(),(0,n.CE)("div",r,[(0,n.bF)(s.eB,{name:"fade",mode:"out-in"},{default:(0,n.k6)((()=>["login"===i.currentView?((0,n.uX)(),(0,n.Wv)(c,{key:0,onLoginSuccess:l.onLoginSuccess,onShowRegister:l.showRegister},null,8,["onLoginSuccess","onShowRegister"])):"register"===i.currentView?((0,n.uX)(),(0,n.Wv)(d,{key:1,onShowLogin:l.showLogin},null,8,["onShowLogin"])):((0,n.uX)(),(0,n.Wv)(u,{key:2,onLogout:l.logout},null,8,["onLogout"]))])),_:1})])}const i=e=>((0,n.Qi)("data-v-d55627d8"),e=e(),(0,n.jt)(),e),l={class:"bg-white p-8 rounded-lg shadow-md w-full max-w-md"},c=i((()=>(0,n.Lk)("h1",{class:"text-2xl font-semibold text-center mb-6"},"Welcome back",-1))),d={class:"text-center mt-4"};function u(e,t,o,r,a,i){return(0,n.uX)(),(0,n.Wv)(s.eB,{name:"fade"},{default:(0,n.k6)((()=>[(0,n.Lk)("div",l,[c,(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>a.username=e),placeholder:"Email address",required:"",class:"w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"},null,512),[[s.Jo,a.username]]),(0,n.bo)((0,n.Lk)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>a.password=e),placeholder:"Password",required:"",class:"w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"},null,512),[[s.Jo,a.password]]),(0,n.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>i.login&&i.login(...e)),class:"w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition duration-300"}," Log in "),(0,n.Lk)("div",d,[(0,n.Lk)("a",{href:"#",onClick:t[3]||(t[3]=(0,s.D$)((t=>e.$emit("show-register")),["prevent"])),class:"text-gray-600 hover:underline"}," Don't hav e an account? Sign up ")])])])),_:1})}var h={name:"LoginForm",data(){return{username:"",password:""}},methods:{login(){fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,password:this.password})}).then((e=>e.json())).then((e=>{"登录成功"===e.message?this.$emit("login-success"):alert(e.message)})).catch((e=>{console.error("Error:",e)}))}}},p=o(6262);const g=(0,p.A)(h,[["render",u],["__scopeId","data-v-d55627d8"]]);var m=g;const f=e=>((0,n.Qi)("data-v-0681ccb2"),e=e(),(0,n.jt)(),e),y={class:"bg-white p-8 rounded-lg shadow-md w-full max-w-md"},b=f((()=>(0,n.Lk)("h1",{class:"text-2xl font-semibold text-center mb-6"},"Create your account",-1))),v={class:"text-center mt-4"};function w(e,t,o,r,a,i){return(0,n.uX)(),(0,n.Wv)(s.eB,{name:"fade"},{default:(0,n.k6)((()=>[(0,n.Lk)("div",y,[b,(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>a.username=e),placeholder:"Email address",required:"",class:"w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"},null,512),[[s.Jo,a.username]]),(0,n.bo)((0,n.Lk)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>a.password=e),placeholder:"Password",required:"",class:"w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"},null,512),[[s.Jo,a.password]]),(0,n.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>i.register&&i.register(...e)),class:"w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition duration-300"}," Sign up "),(0,n.Lk)("div",v,[(0,n.Lk)("a",{href:"#",onClick:t[3]||(t[3]=(0,s.D$)((t=>e.$emit("show-login")),["prevent"])),class:"text-gray-600 hover:underline"}," Already have an account? Log in ")])])])),_:1})}var x={name:"RegisterForm",data(){return{username:"",password:""}},methods:{register(){fetch("/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,password:this.password})}).then((e=>e.json())).then((e=>{alert(e.message),"注册成功"===e.message&&this.$emit("show-login")})).catch((e=>{console.error("Error:",e)}))}}};const k=(0,p.A)(x,[["render",w],["__scopeId","data-v-0681ccb2"]]);var C=k,L=o(33);const E=e=>((0,n.Qi)("data-v-63658dce"),e=e(),(0,n.jt)(),e),I={class:"flex h-screen w-screen bg-pastel-pink"},_={class:"w-1/5 bg-pastel-blue border-r border-pastel-purple flex flex-col rounded-r-xl shadow-lg"},S={class:"p-4"},T=E((()=>(0,n.Lk)("i",{class:"fas fa-star mr-2"},null,-1))),P={class:"flex-1 overflow-y-auto"},M=["onClick","disabled"],j={class:"flex items-center flex-grow"},$=E((()=>(0,n.Lk)("i",{class:"far fa-heart mr-3"},null,-1))),A={class:"text-sm"},B=["onClick"],O=E((()=>(0,n.Lk)("i",{class:"fas fa-times"},null,-1))),F=[O],J={class:"p-4 border-t border-pastel-purple flex items-center justify-between"},X=E((()=>(0,n.Lk)("i",{class:"fas fa-cog mr-2"},null,-1))),R=E((()=>(0,n.Lk)("i",{class:"fas fa-chevron-left"},null,-1))),W=[R],Q={class:"flex-1 overflow-y-auto px-4 py-6 bg-pastel-cream",ref:"chatMessages"},N={class:"border-t border-pastel-purple p-4 bg-pastel-blue"},z={class:"flex items-center bg-white rounded-full shadow-md"},U=E((()=>(0,n.Lk)("i",{class:"fas fa-chevron-left"},null,-1))),V=[U],q=E((()=>(0,n.Lk)("i",{class:"fas fa-paper-plane"},null,-1))),H=[q],D=E((()=>(0,n.Lk)("i",{class:"fas fa-paperclip"},null,-1))),K=[D],G=E((()=>(0,n.Lk)("div",{class:"text-xs text-pastel-purple mt-2 text-center"}," Magic may produce unexpected results. Use with caution! ",-1))),Y={key:0,class:"fixed inset-0 bg-pastel-purple bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"},Z={class:"bg-pastel-cream p-5 rounded-xl shadow-xl w-1/3"},ee={class:"flex justify-between items-center mb-4"},te=E((()=>(0,n.Lk)("h2",{class:"text-xl font-bold text-pastel-purple"},"Magic Settings",-1))),oe=E((()=>(0,n.Lk)("i",{class:"fas fa-times"},null,-1))),se=[oe],ne={class:"space-y-4"},re=E((()=>(0,n.Lk)("i",{class:"fas fa-door-open mr-2"},null,-1))),ae=E((()=>(0,n.Lk)("i",{class:"fas fa-wand-magic-sparkles mr-2"},null,-1))),ie=E((()=>(0,n.Lk)("i",{class:"fas fa-hat-wizard mr-2"},null,-1))),le=E((()=>(0,n.Lk)("i",{class:"fas fa-wand-sparkles mr-2"},null,-1))),ce=E((()=>(0,n.Lk)("i",{class:"fas fa-mug-hot mr-2"},null,-1)));function de(e,t,o,r,a,i){const l=(0,n.g2)("ChatMessageComponent"),c=(0,n.g2)("PythonInterpreter"),d=(0,n.g2)("CCompiler"),u=(0,n.g2)("CppCompiler"),h=(0,n.g2)("JavaCompiler");return(0,n.uX)(),(0,n.CE)("div",I,[(0,n.bF)(s.eB,{name:"slide-fade-show"},{default:(0,n.k6)((()=>[(0,n.bo)((0,n.Lk)("div",_,[(0,n.Lk)("div",S,[(0,n.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>i.newConversation&&i.newConversation(...e)),class:"w-full bg-pastel-yellow text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-orange transition duration-300 flex items-center justify-center kawaii-button"},[T,(0,n.eW)(" New Adventure ")])]),(0,n.Lk)("div",P,[(0,n.bF)(s.F,{name:"conversation",tag:"div"},{default:(0,n.k6)((()=>[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(a.conversations,((e,t)=>((0,n.uX)(),(0,n.CE)("div",{key:e.history_num,class:(0,L.C4)(["p-3 hover:bg-pastel-green cursor-pointer transition duration-300 flex items-center justify-between mb-2 mx-2 rounded-xl",{"bg-pastel-purple text-white":a.currentConversationIndex===e.history_num}]),onClick:t=>i.switchConversation(e.history_num),disabled:a.isLoading,style:(0,L.Tr)({"--i":t})},[(0,n.Lk)("div",j,[$,(0,n.Lk)("span",A,(0,L.v_)(e.title||"New Adventure"),1)]),(0,n.Lk)("button",{onClick:(0,s.D$)((t=>i.deleteConversation(e.history_num)),["stop"]),class:"text-red-400 hover:text-red-600"},F,8,B)],14,M)))),128))])),_:1})]),(0,n.Lk)("div",J,[(0,n.Lk)("button",{onClick:t[1]||(t[1]=(...e)=>i.openSettings&&i.openSettings(...e)),class:"text-left py-2 px-4 rounded-full hover:bg-pastel-yellow transition duration-300 flex items-center text-sm kawaii-button"},[X,(0,n.eW)(" Magic Settings ")]),(0,n.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>i.toggleSidebar&&i.toggleSidebar(...e)),class:"p-2 rounded-full hover:bg-pastel-yellow transition duration-300"},W)])],512),[[s.aG,a.showSidebar]])])),_:1}),(0,n.Lk)("div",{class:(0,L.C4)(["flex-1 flex flex-col",{"w-full":!a.showSidebar,"w-4/5":a.showSidebar}])},[(0,n.Lk)("div",Q,[(0,n.bF)(s.F,{name:"message-fade",tag:"div"},{default:(0,n.k6)((()=>[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(a.messages,((e,t)=>((0,n.uX)(),(0,n.CE)("div",{key:t,class:"mb-6"},[(0,n.bF)(l,{message:e},null,8,["message"])])))),128))])),_:1})],512),(0,n.Lk)("div",N,[(0,n.Lk)("div",z,[a.showSidebar?(0,n.Q3)("",!0):((0,n.uX)(),(0,n.CE)("button",{key:0,onClick:t[3]||(t[3]=(...e)=>i.toggleSidebar&&i.toggleSidebar(...e)),class:(0,L.C4)(["p-2 text-pastel-purple",{"transform rotate-180":!a.showSidebar}])},V,2)),(0,n.bo)((0,n.Lk)("textarea",{"onUpdate:modelValue":t[4]||(t[4]=e=>a.userInput=e),onKeyup:t[5]||(t[5]=(0,s.jR)(((...e)=>i.sendMessage&&i.sendMessage(...e)),["enter"])),placeholder:"Cast your spell...",class:"flex-1 px-4 py-2 focus:outline-none resize-none rounded-full",rows:"1"},null,544),[[s.Jo,a.userInput]]),(0,n.Lk)("button",{onClick:t[6]||(t[6]=(...e)=>i.sendMessage&&i.sendMessage(...e)),class:"p-2 text-pastel-purple hover:text-pastel-orange"},H),(0,n.Lk)("input",{type:"file",ref:"fileInput",onChange:t[7]||(t[7]=(...e)=>i.handleFileUpload&&i.handleFileUpload(...e)),multiple:"",style:{display:"none"}},null,544),(0,n.Lk)("button",{onClick:t[8]||(t[8]=t=>e.$refs.fileInput.click()),class:"p-2 text-pastel-purple hover:text-pastel-orange"},K)]),G])],2),a.showSettings?((0,n.uX)(),(0,n.CE)("div",Y,[(0,n.Lk)("div",Z,[(0,n.Lk)("div",ee,[te,(0,n.Lk)("button",{onClick:t[9]||(t[9]=(...e)=>i.closeSettings&&i.closeSettings(...e)),class:"text-pastel-purple hover:text-pastel-orange"},se)]),(0,n.Lk)("div",ne,[(0,n.Lk)("button",{onClick:t[10]||(t[10]=(...e)=>i.logout&&i.logout(...e)),class:"w-full bg-pastel-pink text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-orange transition duration-300 flex items-center justify-center kawaii-button"},[re,(0,n.eW)(" Exit Magical Realm ")]),(0,n.Lk)("button",{onClick:t[11]||(t[11]=(...e)=>i.runPythonInterpreter&&i.runPythonInterpreter(...e)),class:"w-full bg-pastel-green text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-yellow transition duration-300 flex items-center justify-center kawaii-button"},[ae,(0,n.eW)(" Summon Python Familiar ")]),(0,n.Lk)("button",{onClick:t[12]||(t[12]=e=>a.showCCompiler=!0),class:"w-full bg-pastel-blue text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-yellow transition duration-300 flex items-center justify-center kawaii-button"},[ie,(0,n.eW)(" Invoke C Spells ")]),(0,n.Lk)("button",{onClick:t[13]||(t[13]=e=>a.showCppCompiler=!0),class:"w-full bg-pastel-orange text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-yellow transition duration-300 flex items-center justify-center kawaii-button"},[le,(0,n.eW)(" Cast C++ Enchantments ")]),(0,n.Lk)("button",{onClick:t[14]||(t[14]=e=>a.showJavaCompiler=!0),class:"w-full bg-pastel-yellow text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-orange transition duration-300 flex items-center justify-center kawaii-button"},[ce,(0,n.eW)(" Brew Java Potions ")])])])])):(0,n.Q3)("",!0),(0,n.bF)(c,{show:a.showPythonInterpreter,onClose:i.closePythonInterpreter,ref:"pythonInterpreter"},null,8,["show","onClose"]),(0,n.bF)(d,{visible:a.showCCompiler,onClose:t[15]||(t[15]=e=>a.showCCompiler=!1)},null,8,["visible"]),(0,n.bF)(u,{visible:a.showCppCompiler,onClose:t[16]||(t[16]=e=>a.showCppCompiler=!1)},null,8,["visible"]),(0,n.bF)(h,{visible:a.showJavaCompiler,onClose:t[17]||(t[17]=e=>a.showJavaCompiler=!1)},null,8,["visible"])])}var ue=o(2053);const he={class:"mb-6"},pe=["innerHTML"];function ge(e,t,o,r,a,i){return(0,n.uX)(),(0,n.CE)("div",he,[(0,n.bF)(s.eB,{name:"message-pop"},{default:(0,n.k6)((()=>[(0,n.Lk)("div",{class:(0,L.C4)(["flex",{"justify-end":"user"===o.message.sender}])},[(0,n.Lk)("div",{class:(0,L.C4)(["max-w-2xl rounded-2xl p-4 shadow-lg message-bubble","user"===o.message.sender?"user-message":"ai-message"])},[(0,n.Lk)("div",{class:"message-content",innerHTML:i.formattedMessage},null,8,pe)],2)],2)])),_:1})])}o(2838);var me=o(7453),fe=o(508),ye=o(8716),be=o.n(ye),ve={name:"ChatMessageComponent",props:{message:{type:Object,required:!0}},setup(){const e=(0,n.WQ)("runPythonCode"),t=(0,n.WQ)("showPythonInterpreter");return{runPythonCode:e,showPythonInterpreter:t}},computed:{formattedMessage(){return"ai"===this.message.sender?(me.xI.setOptions({highlight:function(e,t){return t&&fe.A.getLanguage(t)?fe.A.highlight(t,e).value:fe.A.highlightAuto(e).value},langPrefix:"hljs language-"}),(0,me.xI)(this.message.content)):this.message.content}},mounted(){this.$nextTick((()=>{this.highlightCodeBlocks()}))},updated(){this.$nextTick((()=>{this.highlightCodeBlocks()}))},methods:{highlightCodeBlocks(){this.$el.querySelectorAll("pre code").forEach((e=>{fe.A.highlightElement(e);const t=e.parentNode,o=e.classList[0].split("-")[1],s=document.createElement("div");s.className="code-toolbar";const n=document.createElement("span");n.className="lang-tag",n.textContent=o,s.appendChild(n);const r=document.createElement("button");if(r.className="copy-btn",r.textContent="Copy",s.appendChild(r),"python"===o){const e=document.createElement("button");e.className="run-btn",e.textContent="Run",s.appendChild(e)}t.insertBefore(s,t.firstChild),t.style.paddingTop="30px"})),new(be())(".copy-btn",{target:function(e){return e.parentNode.parentNode.querySelector("code")}});const e=e=>{this.showPythonInterpreter.value=!0,this.runPythonCode(e)};this.$el.querySelectorAll(".run-btn").forEach((t=>{t.addEventListener("click",(()=>{const o=t.parentNode.parentNode.querySelector("code"),s=o.innerText;e(s)}))}))}}};const we=(0,p.A)(ve,[["render",ge],["__scopeId","data-v-ff4f1036"]]);var xe=we;const ke={key:0,class:"fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"},Ce={class:"bg-white p-5 rounded-lg shadow-xl w-3/4 h-3/4 flex flex-col"},Le={class:"flex justify-between items-center mb-4"},Ee=(0,n.Lk)("h2",{class:"text-xl font-bold"},"Python Interpreter",-1),Ie=(0,n.Lk)("i",{class:"fas fa-times"},null,-1),_e=[Ie],Se=(0,n.Lk)("div",{id:"python-terminal",class:"flex-grow bg-black text-white p-4 rounded overflow-auto"},null,-1);function Te(e,t,o,s,r,a){return o.show?((0,n.uX)(),(0,n.CE)("div",ke,[(0,n.Lk)("div",Ce,[(0,n.Lk)("div",Le,[Ee,(0,n.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.close&&a.close(...e)),class:"text-gray-500 hover:text-gray-700"},_e)]),Se])])):(0,n.Q3)("",!0)}var Pe={name:"PythonInterpreter",props:{show:{type:Boolean,required:!0}},data(){return{pyodide:null,initialized:!1,codeBuffer:"",isMultiline:!1,indentLevel:0}},methods:{close(){this.$emit("close")},async loadPyodide(){if(!this.pyodide){const e=document.getElementById("python-terminal");e.innerHTML+="Loading Pyodide...<br>",this.pyodide=await loadPyodide(),this.loadTerminalPrompt()}},async runPythonInterpreter(){await this.$nextTick(),this.pyodide||await this.loadPyodide(),this.loadTerminalPrompt(),this.createInputElement()},loadTerminalPrompt(){const e=document.getElementById("python-terminal");e.innerHTML="Python 3.9.5 (default, May 3 2021, 19:12:05)<br>",e.innerHTML+="[Pyodide] on WebAssembly/JavaScript<br>",e.innerHTML+='Type "help", "copyright", "credits" or "license" for more information.<br>'},createInputElement(){const e=document.getElementById("python-terminal"),t=document.createElement("span");t.textContent=this.isMultiline?"... ":">>> ",e.appendChild(t);const o=document.createElement("input");o.type="text",o.style.background="transparent",o.style.border="none",o.style.outline="none",o.style.color="white",o.style.width="95%",e.appendChild(o),o.focus(),o.addEventListener("keydown",(async s=>{if("Enter"===s.key){const s=o.value;e.removeChild(o),e.removeChild(t),e.innerHTML+=`${t.textContent}${s}<br>`,await this.handleCommand(s)}else if("Tab"===s.key){s.preventDefault();const e=o.selectionStart,t=o.selectionEnd;o.value=o.value.substring(0,e)+"    "+o.value.substring(t),o.selectionStart=o.selectionEnd=e+4}}))},async handleCommand(e){if(""===e.trim()&&this.isMultiline)await this.runPythonCommand(this.codeBuffer),this.isMultiline=!1,this.indentLevel=0,this.codeBuffer="";else if(""===e.trim())return void this.createInputElement();this.isMultiline?(this.codeBuffer+="    ".repeat(this.indentLevel)+e+"\n",e.trim().endsWith(":")?this.indentLevel++:("return"===e.trim()||e.trim().startsWith("break")||e.trim().startsWith("continue"))&&(this.indentLevel=Math.max(0,this.indentLevel-1))):e.trim().endsWith(":")?(this.isMultiline=!0,this.indentLevel=1,this.codeBuffer=e+"\n"):await this.runPythonCommand(e),this.createInputElement()},async runPythonCommand(e){const t=document.getElementById("python-terminal");try{const o=this.processIndentation(e),s=await this.pyodide.runPythonAsync(`\n      import sys\n      from io import StringIO\n      \n      def custom_repr(obj):\n          if isinstance(obj, type):\n              return obj.__name__\n          return repr(obj)\n      \n      old_stdout = sys.stdout\n      sys.stdout = mystdout = StringIO()\n      try:\n          try:\n              result = eval(${JSON.stringify(o)}, globals())\n              if result is not None:\n                  print(custom_repr(result))\n          except SyntaxError:\n              exec(${JSON.stringify(o)}, globals())\n      except Exception as e:\n          print(str(e))\n      sys.stdout = old_stdout\n      mystdout.getvalue()\n    `);void 0!==s&&""!==s.trim()&&(t.innerHTML+=s+"<br>")}catch(o){t.innerHTML+=o.toString()+"<br>"}},processIndentation(e){return e.replace(/\t/g,"    ")},async runCode(e){this.pyodide||await this.loadPyodide(),await this.runPythonCommand(e),this.createInputElement()}},mounted(){this.runPythonInterpreter()}};const Me=(0,p.A)(Pe,[["render",Te]]);var je=Me;const $e=e=>((0,n.Qi)("data-v-0600662c"),e=e(),(0,n.jt)(),e),Ae={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},Be={class:"bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-6 relative"},Oe=$e((()=>(0,n.Lk)("svg",{class:"w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20"},[(0,n.Lk)("path",{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))),Fe=[Oe],Je=$e((()=>(0,n.Lk)("h2",{class:"text-2xl font-bold mb-4 text-gray-800"},"C Compiler",-1))),Xe={class:"mb-4 relative"},Re=$e((()=>(0,n.Lk)("div",{class:"code-background absolute inset-0"},null,-1))),We=$e((()=>(0,n.Lk)("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[(0,n.Lk)("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z","clip-rule":"evenodd"})],-1))),Qe={key:0,class:"mt-4 bg-green-100 rounded-md p-4"},Ne=$e((()=>(0,n.Lk)("h3",{class:"text-lg font-semibold mb-2 text-gray-800"},"Output:",-1))),ze={class:"text-sm font-mono whitespace-pre-wrap break-words text-gray-700"},Ue={key:1,class:"mt-4 bg-red-100 rounded-md p-4"},Ve=$e((()=>(0,n.Lk)("h3",{class:"text-lg font-semibold mb-2 text-red-800"},"Error:",-1))),qe={class:"text-sm font-mono whitespace-pre-wrap break-words text-red-700"};function He(e,t,o,r,a,i){return o.visible?((0,n.uX)(),(0,n.CE)("div",Ae,[(0,n.Lk)("div",Be,[(0,n.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>i.close&&i.close(...e)),class:"absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200","aria-label":"Close"},Fe),Je,(0,n.Lk)("div",Xe,[Re,(0,n.bo)((0,n.Lk)("textarea",{ref:"codeEditor","onUpdate:modelValue":t[1]||(t[1]=e=>a.code=e),onKeydown:t[2]||(t[2]=(...e)=>i.handleTab&&i.handleTab(...e)),placeholder:"Enter your C code here",spellcheck:"false",class:"w-full h-64 p-4 text-sm font-mono bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative z-10"},null,544),[[s.Jo,a.code]])]),(0,n.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>i.compileAndRun&&i.compileAndRun(...e)),class:"flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"},[We,(0,n.eW)(" Compile and Run ")]),a.output?((0,n.uX)(),(0,n.CE)("div",Qe,[Ne,(0,n.Lk)("pre",ze,(0,L.v_)(a.output),1)])):(0,n.Q3)("",!0),a.error?((0,n.uX)(),(0,n.CE)("div",Ue,[Ve,(0,n.Lk)("pre",qe,(0,L.v_)(a.error),1)])):(0,n.Q3)("",!0)])])):(0,n.Q3)("",!0)}var De={props:{visible:{type:Boolean,default:!1}},data(){return{code:"",output:"",error:""}},methods:{async compileAndRun(){try{const e=await ue.A.post("/compile_run_c",{code:this.code});e.data.output?(this.output=e.data.output,this.error=""):e.data.error&&(this.error=e.data.error,this.output="")}catch(e){this.error=e.response.data.error,this.output=""}},close(){this.$emit("close")},handleTab(e){if("Tab"===e.key){e.preventDefault();const t=this.$refs.codeEditor.selectionStart,o=this.$refs.codeEditor.selectionEnd;this.code=this.code.substring(0,t)+"    "+this.code.substring(o),this.$nextTick((()=>{this.$refs.codeEditor.selectionStart=this.$refs.codeEditor.selectionEnd=t+4}))}}}};const Ke=(0,p.A)(De,[["render",He],["__scopeId","data-v-0600662c"]]);var Ge=Ke,Ye=o(953);const Ze=e=>((0,n.Qi)("data-v-28b577d8"),e=e(),(0,n.jt)(),e),et={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},tt={class:"bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-6 relative"},ot=Ze((()=>(0,n.Lk)("svg",{class:"w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20"},[(0,n.Lk)("path",{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))),st=[ot],nt=Ze((()=>(0,n.Lk)("h2",{class:"text-2xl font-bold mb-4 text-gray-800"},"Cpp Compiler",-1))),rt={class:"mb-4 relative"},at=Ze((()=>(0,n.Lk)("div",{class:"code-background absolute inset-0"},null,-1))),it=Ze((()=>(0,n.Lk)("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[(0,n.Lk)("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z","clip-rule":"evenodd"})],-1))),lt={key:0,class:"mt-4 bg-green-100 rounded-md p-4"},ct=Ze((()=>(0,n.Lk)("h3",{class:"text-lg font-semibold mb-2 text-gray-800"},"Output:",-1))),dt={class:"text-sm font-mono whitespace-pre-wrap break-words text-gray-700"},ut={key:1,class:"mt-4 bg-red-100 rounded-md p-4"},ht=Ze((()=>(0,n.Lk)("h3",{class:"text-lg font-semibold mb-2 text-red-800"},"Error:",-1))),pt={class:"text-sm font-mono whitespace-pre-wrap break-words text-red-700"};function gt(e,t,o,r,a,i){return o.visible?((0,n.uX)(),(0,n.CE)("div",et,[(0,n.Lk)("div",tt,[(0,n.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>i.close&&i.close(...e)),class:"absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200","aria-label":"Close"},st),nt,(0,n.Lk)("div",rt,[at,(0,n.bo)((0,n.Lk)("textarea",{ref:"codeEditor","onUpdate:modelValue":t[1]||(t[1]=e=>a.code=e),onKeydown:t[2]||(t[2]=(...e)=>i.handleTab&&i.handleTab(...e)),placeholder:"Enter your Cpp code here",spellcheck:"false",class:"w-full h-64 p-4 text-sm font-mono bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative z-10"},null,544),[[s.Jo,a.code]])]),(0,n.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>i.compileAndRun&&i.compileAndRun(...e)),class:"flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"},[it,(0,n.eW)(" Compile and Run ")]),a.output?((0,n.uX)(),(0,n.CE)("div",lt,[ct,(0,n.Lk)("pre",dt,(0,L.v_)(a.output),1)])):(0,n.Q3)("",!0),a.error?((0,n.uX)(),(0,n.CE)("div",ut,[ht,(0,n.Lk)("pre",pt,(0,L.v_)(a.error),1)])):(0,n.Q3)("",!0)])])):(0,n.Q3)("",!0)}var mt={props:{visible:{type:Boolean,default:!1}},data(){return{code:"",output:"",error:""}},methods:{async compileAndRun(){try{const e=await ue.A.post("/compile_run_cpp",{code:this.code});e.data.output?(this.output=e.data.output,this.error=""):e.data.error&&(this.error=e.data.error,this.output="")}catch(e){this.error=e.response.data.error,this.output=""}},close(){this.$emit("close")},handleTab(e){if("Tab"===e.key){e.preventDefault();const t=this.$refs.codeEditor.selectionStart,o=this.$refs.codeEditor.selectionEnd;this.code=this.code.substring(0,t)+"    "+this.code.substring(o),this.$nextTick((()=>{this.$refs.codeEditor.selectionStart=this.$refs.codeEditor.selectionEnd=t+4}))}}}};const ft=(0,p.A)(mt,[["render",gt],["__scopeId","data-v-28b577d8"]]);var yt=ft;const bt=e=>((0,n.Qi)("data-v-1eb033af"),e=e(),(0,n.jt)(),e),vt={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},wt={class:"bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-6 relative"},xt=bt((()=>(0,n.Lk)("svg",{class:"w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20"},[(0,n.Lk)("path",{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))),kt=[xt],Ct=bt((()=>(0,n.Lk)("h2",{class:"text-2xl font-bold mb-4 text-gray-800"},"Java Compiler",-1))),Lt={class:"mb-4 relative"},Et=bt((()=>(0,n.Lk)("div",{class:"code-background absolute inset-0"},null,-1))),It=bt((()=>(0,n.Lk)("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[(0,n.Lk)("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z","clip-rule":"evenodd"})],-1))),_t={key:0,class:"mt-4 bg-green-100 rounded-md p-4"},St=bt((()=>(0,n.Lk)("h3",{class:"text-lg font-semibold mb-2 text-gray-800"},"Output:",-1))),Tt={class:"text-sm font-mono whitespace-pre-wrap break-words text-gray-700"},Pt={key:1,class:"mt-4 bg-red-100 rounded-md p-4"},Mt=bt((()=>(0,n.Lk)("h3",{class:"text-lg font-semibold mb-2 text-red-800"},"Error:",-1))),jt={class:"text-sm font-mono whitespace-pre-wrap break-words text-red-700"};function $t(e,t,o,r,a,i){return o.visible?((0,n.uX)(),(0,n.CE)("div",vt,[(0,n.Lk)("div",wt,[(0,n.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>i.close&&i.close(...e)),class:"absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200","aria-label":"Close"},kt),Ct,(0,n.Lk)("div",Lt,[Et,(0,n.bo)((0,n.Lk)("textarea",{ref:"codeEditor","onUpdate:modelValue":t[1]||(t[1]=e=>a.code=e),onKeydown:t[2]||(t[2]=(...e)=>i.handleTab&&i.handleTab(...e)),placeholder:"Enter your Java code here",spellcheck:"false",class:"w-full h-64 p-4 text-sm font-mono bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative z-10"},null,544),[[s.Jo,a.code]])]),(0,n.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>i.compileAndRun&&i.compileAndRun(...e)),class:"flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"},[It,(0,n.eW)(" Compile and Run ")]),a.output?((0,n.uX)(),(0,n.CE)("div",_t,[St,(0,n.Lk)("pre",Tt,(0,L.v_)(a.output),1)])):(0,n.Q3)("",!0),a.error?((0,n.uX)(),(0,n.CE)("div",Pt,[Mt,(0,n.Lk)("pre",jt,(0,L.v_)(a.error),1)])):(0,n.Q3)("",!0)])])):(0,n.Q3)("",!0)}var At={props:{visible:{type:Boolean,default:!1}},data(){return{code:"",output:"",error:""}},methods:{async compileAndRun(){try{const e=await ue.A.post("/compile_run_java",{code:this.code});e.data.output?(this.output=e.data.output,this.error=""):e.data.error&&(this.error=e.data.error,this.output="")}catch(e){this.error=e.response.data.error,this.output=""}},close(){this.$emit("close")},handleTab(e){if("Tab"===e.key){e.preventDefault();const t=this.$refs.codeEditor.selectionStart,o=this.$refs.codeEditor.selectionEnd;this.code=this.code.substring(0,t)+"    "+this.code.substring(o),this.$nextTick((()=>{this.$refs.codeEditor.selectionStart=this.$refs.codeEditor.selectionEnd=t+4}))}}}};const Bt=(0,p.A)(At,[["render",$t],["__scopeId","data-v-1eb033af"]]);var Ot=Bt,Ft={name:"ChatInterface",data(){return{messages:[],userInput:"",conversations:(0,Ye.Kh)([]),currentConversationIndex:0,isLoading:!1,showPythonInterpreter:!1,showSidebar:!0,showSettings:!1,showCCompiler:!1,showCppCompiler:!1,showJavaCompiler:!1}},provide(){return{runPythonCode:this.runPythonCode,showPythonInterpreter:()=>this.showPythonInterpreter}},components:{ChatMessageComponent:xe,PythonInterpreter:je,CCompiler:Ge,CppCompiler:yt,JavaCompiler:Ot},mounted(){this.loadConversations(),this.scrollToBottom()},methods:{async sendMessage(){if(""===this.userInput.trim())return;const e={sender:"user",content:this.userInput};this.messages.push(e),this.userInput="",this.scrollToBottom(),this.isLoading=!0;try{const t=await fetch("/ask",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:e.content})}),o=t.body.getReader(),s=new TextDecoder("utf-8");let n="";while(1){const{done:e,value:t}=await o.read();if(e)break;const r=s.decode(t);n+=r,this.updateLastAIMessage(n),this.forceUpdateMessages()}await this.updateConversationTitle(),this.scrollToBottom(),this.forceUpdateMessages()}catch(t){console.error("Error:",t)}finally{this.isLoading=!1}},async updateConversationTitle(){try{const e=await fetch("/update_conversation_title",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({history_num:this.currentConversationIndex})}),t=await e.json(),{history_num:o,new_title:s}=t,n=this.conversations.findIndex((e=>e.history_num===o));-1!==n&&(this.conversations[n].title=s),console.log("now coversation",this.conversations[n]),console.log("now title",this.conversations[n].title),console.log("new title",this.conversations[n].title),this.$forceUpdate()}catch(e){console.error("Error updating conversation title:",e)}},updateLastAIMessage(e){const t=this.messages[this.messages.length-1];"ai"===t.sender?t.content=e:this.messages.push({sender:"ai",content:e}),this.$nextTick((()=>{this.highlightCodeBlocks()}))},scrollToBottom(){this.$nextTick((()=>{const e=this.$refs.chatMessages;e.scrollTop=e.scrollHeight}))},logout(){ue.A.get("/logout").then((()=>{this.$emit("logout")})).catch((e=>{console.error("Logout error:",e)}))},async loadConversations(){try{const e=await ue.A.get("/get_conversations"),t=e.data.conversations.map((e=>({history_num:e.history_num,title:e.name||"New Chat"})));this.conversations=t,this.conversations.length>0?this.conversations.some((e=>e.history_num===this.currentConversationIndex))?await this.switchConversation(this.currentConversationIndex):await this.switchConversation(this.conversations[0].history_num):(this.messages=[],this.currentConversationIndex=null)}catch(e){console.error("Error loading conversations:",e)}},async newConversation(){try{const e=await ue.A.post("/new_conversation");this.conversations.push({history_num:e.data.history_num,title:""}),console.log("num count",e.data.history_num),this.switchConversation(e.data.history_num)}catch(e){console.error("Error creating new conversation:",e)}},async switchConversation(e){if(!(this.currentConversationIndex===e&&this.messages.length>0)){this.currentConversationIndex=e,this.isLoading=!0;try{const t=await ue.A.post("/switch_conversation",{history_num:e});t.data.chat_history?this.messages=t.data.chat_history.map((e=>({sender:"HumanMessage"===e.type?"user":"ai",content:e.content}))):this.messages=[],this.$nextTick((()=>{this.scrollToBottom(),this.forceUpdateMessages()}))}catch(t){console.error("Error switching conversation:",t)}finally{this.isLoading=!1}}},forceUpdateMessages(){this.messages=this.messages.map((e=>({...e})))},async handleFileUpload(){const e=this.$refs.fileInput.files;if(0===e.length)return;const t=new FormData;for(let s=0;s<e.length;s++)t.append("files",e[s]);try{const e=await ue.A.post("/upload",t,{headers:{"Content-Type":"multipart/form-data"}});console.log(e.data.message),this.messages.push({sender:"system",content:"Files uploaded successfully"})}catch(o){console.error("Error uploading files:",o),this.messages.push({sender:"system",content:"File upload failed"})}},async deleteConversation(e){try{await ue.A.post("/delete_conversation",{history_num:e});const t=this.conversations.findIndex((t=>t.history_num===e));this.conversations.splice(t,1),this.loadConversations(),console.log("conversations length",this.conversations.length),console.log("delete num",e),e===this.currentConversationIndex?this.conversations.length>0?0===e?(this.currentConversationIndex=-1,await this.switchConversation(e),console.log("deleteConversation hit case 1")):e===this.conversations.length?(await this.switchConversation(e-1),console.log("deleteConversation hit case 2")):(this.currentConversationIndex=-1,await this.switchConversation(e),console.log("deleteConversation hit case 3")):(this.messages=[],this.currentConversationIndex=-1):this.switchConversation(this.currentConversationIndex-1)}catch(t){console.error("Error deleting conversation:",t)}},toggleSidebar(){this.showSidebar?this.showSidebar=!1:this.$nextTick((()=>{this.showSidebar=!0}))},openSettings(){this.showSettings=!0},closeSettings(){this.showSettings=!1},runPythonInterpreter(){this.showPythonInterpreter=!0,this.$nextTick((()=>{this.$refs.pythonInterpreter.runPythonInterpreter()}))},runPythonCode(e){this.showPythonInterpreter=!0,this.$nextTick((()=>{this.$refs.pythonInterpreter.runCode(e)}))},closePythonInterpreter(){this.showPythonInterpreter=!1}}};const Jt=(0,p.A)(Ft,[["render",de],["__scopeId","data-v-63658dce"]]);var Xt=Jt,Rt={name:"App",components:{Login:m,Register:C,ChatInterface:Xt},data(){return{currentView:"login"}},methods:{onLoginSuccess(){this.currentView="chat"},showRegister(){this.currentView="register"},showLogin(){this.currentView="login"},logout(){this.currentView="login"}}};const Wt=(0,p.A)(Rt,[["render",a]]);var Qt=Wt,Nt=o(5798);const zt=[{path:"/login",component:m},{path:"/register",component:C},{path:"/chat",component:Xt}],Ut=(0,Nt.aE)({history:(0,Nt.LA)(),routes:zt});var Vt=Ut;(0,s.Ef)(Qt).use(Vt).mount("#app")}},t={};function o(s){var n=t[s];if(void 0!==n)return n.exports;var r=t[s]={exports:{}};return e[s].call(r.exports,r,r.exports,o),r.exports}o.m=e,function(){var e=[];o.O=function(t,s,n,r){if(!s){var a=1/0;for(d=0;d<e.length;d++){s=e[d][0],n=e[d][1],r=e[d][2];for(var i=!0,l=0;l<s.length;l++)(!1&r||a>=r)&&Object.keys(o.O).every((function(e){return o.O[e](s[l])}))?s.splice(l--,1):(i=!1,r<a&&(a=r));if(i){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[s,n,r]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var s in t)o.o(t,s)&&!o.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};o.O.j=function(t){return 0===e[t]};var t=function(t,s){var n,r,a=s[0],i=s[1],l=s[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(n in i)o.o(i,n)&&(o.m[n]=i[n]);if(l)var d=l(o)}for(t&&t(s);c<a.length;c++)r=a[c],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(d)},s=self["webpackChunkai_chat_app"]=self["webpackChunkai_chat_app"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=o.O(void 0,[504],(function(){return o(5274)}));s=o.O(s)})();
//# sourceMappingURL=app.09b6e52e.js.map