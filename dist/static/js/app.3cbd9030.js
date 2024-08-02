(function(){"use strict";var e={2414:function(e,t,o){var n=o(3751),s=o(641);const r={class:"min-h-screen bg-gray-50 flex items-center justify-center"};function i(e,t,o,i,a,l){const c=(0,s.g2)("Login"),d=(0,s.g2)("Register"),u=(0,s.g2)("ChatInterface");return(0,s.uX)(),(0,s.CE)("div",r,[(0,s.bF)(n.eB,{name:"fade",mode:"out-in"},{default:(0,s.k6)((()=>["login"===a.currentView?((0,s.uX)(),(0,s.Wv)(c,{key:0,onLoginSuccess:l.onLoginSuccess,onShowRegister:l.showRegister},null,8,["onLoginSuccess","onShowRegister"])):"register"===a.currentView?((0,s.uX)(),(0,s.Wv)(d,{key:1,onShowLogin:l.showLogin},null,8,["onShowLogin"])):((0,s.uX)(),(0,s.Wv)(u,{key:2,onLogout:l.logout},null,8,["onLogout"]))])),_:1})])}const a=e=>((0,s.Qi)("data-v-d0e80ff4"),e=e(),(0,s.jt)(),e),l={class:"bg-white p-8 rounded-lg shadow-md w-full max-w-md anime-bg relative overflow-hidden"},c=a((()=>(0,s.Lk)("div",{class:"anime-character"},null,-1))),d=a((()=>(0,s.Lk)("h1",{class:"text-3xl font-bold text-center mb-6 anime-title"},"Welcome back, Senpai!",-1))),u={class:"text-center mt-4"},p=a((()=>(0,s.Lk)("div",{class:"anime-decoration anime-decoration-1"},null,-1))),h=a((()=>(0,s.Lk)("div",{class:"anime-decoration anime-decoration-2"},null,-1))),m=a((()=>(0,s.Lk)("div",{class:"anime-decoration anime-decoration-3"},null,-1)));function f(e,t,o,r,i,a){return(0,s.uX)(),(0,s.Wv)(n.eB,{name:"fade"},{default:(0,s.k6)((()=>[(0,s.Lk)("div",l,[c,d,(0,s.bo)((0,s.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>i.username=e),placeholder:"Email address",required:"",class:"w-full px-4 py-2 mb-4 border-2 border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 anime-input"},null,512),[[n.Jo,i.username]]),(0,s.bo)((0,s.Lk)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>i.password=e),placeholder:"Password",required:"",class:"w-full px-4 py-2 mb-4 border-2 border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 anime-input"},null,512),[[n.Jo,i.password]]),(0,s.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>a.login&&a.login(...e)),class:"w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 transition duration-300 anime-button"}," Log in "),(0,s.Lk)("div",u,[(0,s.Lk)("a",{href:"#",onClick:t[3]||(t[3]=(0,n.D$)((t=>e.$emit("show-register")),["prevent"])),class:"text-pink-600 hover:underline anime-link"}," New to our world? Join us! ")]),p,h,m])])),_:1})}var g={name:"LoginForm",data(){return{username:"",password:""}},methods:{login(){fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,password:this.password})}).then((e=>e.json())).then((e=>{"登录成功"===e.message?this.$emit("login-success"):alert(e.message)})).catch((e=>{console.error("Error:",e)}))}}},v=o(6262);const b=(0,v.A)(g,[["render",f],["__scopeId","data-v-d0e80ff4"]]);var y=b;const w=e=>((0,s.Qi)("data-v-b9cca714"),e=e(),(0,s.jt)(),e),k={class:"bg-white p-8 rounded-lg shadow-md w-full max-w-md anime-bg relative overflow-hidden"},x=w((()=>(0,s.Lk)("div",{class:"anime-character"},null,-1))),C=w((()=>(0,s.Lk)("h1",{class:"text-3xl font-bold text-center mb-6 anime-title"},"Join Our Anime World!",-1))),L={class:"text-center mt-4"},E=w((()=>(0,s.Lk)("div",{class:"anime-decoration anime-decoration-1"},null,-1))),I=w((()=>(0,s.Lk)("div",{class:"anime-decoration anime-decoration-2"},null,-1))),_=w((()=>(0,s.Lk)("div",{class:"anime-decoration anime-decoration-3"},null,-1)));function S(e,t,o,r,i,a){return(0,s.uX)(),(0,s.Wv)(n.eB,{name:"fade"},{default:(0,s.k6)((()=>[(0,s.Lk)("div",k,[x,C,(0,s.bo)((0,s.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>i.username=e),placeholder:"Email address",required:"",class:"w-full px-4 py-2 mb-4 border-2 border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 anime-input"},null,512),[[n.Jo,i.username]]),(0,s.bo)((0,s.Lk)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>i.password=e),placeholder:"Password",required:"",class:"w-full px-4 py-2 mb-4 border-2 border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 anime-input"},null,512),[[n.Jo,i.password]]),(0,s.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>a.register&&a.register(...e)),class:"w-full bg-purple-500 text-white py-2 rounded-full hover:bg-purple-600 transition duration-300 anime-button"}," Sign up "),(0,s.Lk)("div",L,[(0,s.Lk)("a",{href:"#",onClick:t[3]||(t[3]=(0,n.D$)((t=>e.$emit("show-login")),["prevent"])),class:"text-purple-600 hover:underline anime-link"}," Already part of our crew? Log in! ")]),E,I,_])])),_:1})}var T={name:"RegisterForm",data(){return{username:"",password:""}},methods:{register(){fetch("/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,password:this.password})}).then((e=>e.json())).then((e=>{alert(e.message),"注册成功"===e.message&&this.$emit("show-login")})).catch((e=>{console.error("Error:",e)}))}}};const P=(0,v.A)(T,[["render",S],["__scopeId","data-v-b9cca714"]]);var M=P,j=o(33);const $=e=>((0,s.Qi)("data-v-08a3f8fe"),e=e(),(0,s.jt)(),e),A={class:"flex h-screen w-screen bg-pastel-pink"},B={class:"w-1/5 bg-pastel-blue border-r border-pastel-purple flex flex-col rounded-r-xl shadow-lg"},O={class:"p-4"},J=$((()=>(0,s.Lk)("i",{class:"fas fa-star mr-2"},null,-1))),F={class:"flex-1 overflow-y-auto"},W=["onClick","disabled"],X={class:"flex items-center flex-grow"},R=$((()=>(0,s.Lk)("i",{class:"far fa-heart mr-3"},null,-1))),N={class:"text-sm"},Q=["onClick"],z=$((()=>(0,s.Lk)("i",{class:"fas fa-times"},null,-1))),U=[z],V={class:"p-4 border-t border-pastel-purple flex items-center justify-between"},q=$((()=>(0,s.Lk)("i",{class:"fas fa-cog mr-2"},null,-1))),H=$((()=>(0,s.Lk)("i",{class:"fas fa-chevron-left"},null,-1))),D=[H],K={class:"flex-1 overflow-y-auto px-4 py-6 bg-pastel-cream",ref:"chatMessages"},G={class:"border-t border-pastel-purple p-4 bg-pastel-blue"},Y={class:"flex items-center bg-white rounded-full shadow-md"},Z=$((()=>(0,s.Lk)("i",{class:"fas fa-chevron-left"},null,-1))),ee=[Z],te=$((()=>(0,s.Lk)("i",{class:"fas fa-paper-plane"},null,-1))),oe=[te],ne=$((()=>(0,s.Lk)("i",{class:"fas fa-paperclip"},null,-1))),se=[ne],re=$((()=>(0,s.Lk)("div",{class:"text-xs text-pastel-purple mt-2 text-center"}," Magic may produce unexpected results. Use with caution! ",-1))),ie={key:0,class:"fixed inset-0 bg-pastel-purple bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"},ae={class:"bg-pastel-cream p-5 rounded-xl shadow-xl w-1/3"},le={class:"flex justify-between items-center mb-4"},ce=$((()=>(0,s.Lk)("h2",{class:"text-xl font-bold text-pastel-purple"},"Magic Settings",-1))),de=$((()=>(0,s.Lk)("i",{class:"fas fa-times"},null,-1))),ue=[de],pe={class:"space-y-4"},he=$((()=>(0,s.Lk)("i",{class:"fas fa-door-open mr-2"},null,-1))),me=$((()=>(0,s.Lk)("i",{class:"fas fa-wand-magic-sparkles mr-2"},null,-1))),fe=$((()=>(0,s.Lk)("i",{class:"fas fa-hat-wizard mr-2"},null,-1))),ge=$((()=>(0,s.Lk)("i",{class:"fas fa-wand-sparkles mr-2"},null,-1))),ve=$((()=>(0,s.Lk)("i",{class:"fas fa-mug-hot mr-2"},null,-1)));function be(e,t,o,r,i,a){const l=(0,s.g2)("ChatMessageComponent"),c=(0,s.g2)("PythonInterpreter"),d=(0,s.g2)("CCompiler"),u=(0,s.g2)("CppCompiler"),p=(0,s.g2)("JavaCompiler");return(0,s.uX)(),(0,s.CE)("div",A,[(0,s.bF)(n.eB,{name:"slide-fade-show"},{default:(0,s.k6)((()=>[(0,s.bo)((0,s.Lk)("div",B,[(0,s.Lk)("div",O,[(0,s.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.newConversation&&a.newConversation(...e)),class:"w-full bg-pastel-yellow text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-orange transition duration-300 flex items-center justify-center kawaii-button"},[J,(0,s.eW)(" New Adventure ")])]),(0,s.Lk)("div",F,[(0,s.bF)(n.F,{name:"conversation",tag:"div"},{default:(0,s.k6)((()=>[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(i.conversations,((e,t)=>((0,s.uX)(),(0,s.CE)("div",{key:e.history_num,class:(0,j.C4)(["p-3 hover:bg-pastel-green cursor-pointer transition duration-300 flex items-center justify-between mb-2 mx-2 rounded-xl",{"bg-pastel-purple text-white":i.currentConversationIndex===e.history_num}]),onClick:t=>a.switchConversation(e.history_num),disabled:i.isLoading,style:(0,j.Tr)({"--i":t})},[(0,s.Lk)("div",X,[R,(0,s.Lk)("span",N,(0,j.v_)(e.title||"New Adventure"),1)]),(0,s.Lk)("button",{onClick:(0,n.D$)((t=>a.deleteConversation(e.history_num)),["stop"]),class:"text-red-400 hover:text-red-600"},U,8,Q)],14,W)))),128))])),_:1})]),(0,s.Lk)("div",V,[(0,s.Lk)("button",{onClick:t[1]||(t[1]=(...e)=>a.openSettings&&a.openSettings(...e)),class:"text-left py-2 px-4 rounded-full hover:bg-pastel-yellow transition duration-300 flex items-center text-sm kawaii-button"},[q,(0,s.eW)(" Magic Settings ")]),(0,s.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>a.toggleSidebar&&a.toggleSidebar(...e)),class:"p-2 rounded-full hover:bg-pastel-yellow transition duration-300"},D)])],512),[[n.aG,i.showSidebar]])])),_:1}),(0,s.Lk)("div",{class:(0,j.C4)(["flex-1 flex flex-col",{"w-full":!i.showSidebar,"w-4/5":i.showSidebar}])},[(0,s.Lk)("div",K,[(0,s.bF)(n.F,{name:"message-fade",tag:"div"},{default:(0,s.k6)((()=>[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(i.messages,((e,t)=>((0,s.uX)(),(0,s.CE)("div",{key:t,class:"mb-6"},[(0,s.bF)(l,{message:e},null,8,["message"])])))),128))])),_:1})],512),(0,s.Lk)("div",G,[(0,s.Lk)("div",Y,[i.showSidebar?(0,s.Q3)("",!0):((0,s.uX)(),(0,s.CE)("button",{key:0,onClick:t[3]||(t[3]=(...e)=>a.toggleSidebar&&a.toggleSidebar(...e)),class:(0,j.C4)(["p-2 text-pastel-purple",{"transform rotate-180":!i.showSidebar}])},ee,2)),(0,s.bo)((0,s.Lk)("textarea",{"onUpdate:modelValue":t[4]||(t[4]=e=>i.userInput=e),onKeyup:t[5]||(t[5]=(0,n.jR)(((...e)=>a.sendMessage&&a.sendMessage(...e)),["enter"])),placeholder:"Cast your spell...",class:"flex-1 px-4 py-2 focus:outline-none resize-none rounded-full",rows:"1"},null,544),[[n.Jo,i.userInput]]),(0,s.Lk)("button",{onClick:t[6]||(t[6]=(...e)=>a.sendMessage&&a.sendMessage(...e)),class:"p-2 text-pastel-purple hover:text-pastel-orange"},oe),(0,s.Lk)("input",{type:"file",ref:"fileInput",onChange:t[7]||(t[7]=(...e)=>a.handleFileUpload&&a.handleFileUpload(...e)),multiple:"",style:{display:"none"}},null,544),(0,s.Lk)("button",{onClick:t[8]||(t[8]=t=>e.$refs.fileInput.click()),class:"p-2 text-pastel-purple hover:text-pastel-orange"},se)]),re])],2),i.showSettings?((0,s.uX)(),(0,s.CE)("div",ie,[(0,s.Lk)("div",ae,[(0,s.Lk)("div",le,[ce,(0,s.Lk)("button",{onClick:t[9]||(t[9]=(...e)=>a.closeSettings&&a.closeSettings(...e)),class:"text-pastel-purple hover:text-pastel-orange"},ue)]),(0,s.Lk)("div",pe,[(0,s.Lk)("button",{onClick:t[10]||(t[10]=(...e)=>a.logout&&a.logout(...e)),class:"w-full bg-pastel-pink text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-orange transition duration-300 flex items-center justify-center kawaii-button"},[he,(0,s.eW)(" Exit Magical Realm ")]),(0,s.Lk)("button",{onClick:t[11]||(t[11]=(...e)=>a.runPythonInterpreter&&a.runPythonInterpreter(...e)),class:"w-full bg-pastel-green text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-yellow transition duration-300 flex items-center justify-center kawaii-button"},[me,(0,s.eW)(" Summon Python Familiar ")]),(0,s.Lk)("button",{onClick:t[12]||(t[12]=e=>i.showCCompiler=!0),class:"w-full bg-pastel-blue text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-yellow transition duration-300 flex items-center justify-center kawaii-button"},[fe,(0,s.eW)(" Invoke C Spells ")]),(0,s.Lk)("button",{onClick:t[13]||(t[13]=e=>i.showCppCompiler=!0),class:"w-full bg-pastel-orange text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-yellow transition duration-300 flex items-center justify-center kawaii-button"},[ge,(0,s.eW)(" Cast C++ Enchantments ")]),(0,s.Lk)("button",{onClick:t[14]||(t[14]=e=>i.showJavaCompiler=!0),class:"w-full bg-pastel-yellow text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-orange transition duration-300 flex items-center justify-center kawaii-button"},[ve,(0,s.eW)(" Brew Java Potions ")])])])])):(0,s.Q3)("",!0),(0,s.bF)(c,{show:i.showPythonInterpreter,onClose:a.closePythonInterpreter,ref:"pythonInterpreter"},null,8,["show","onClose"]),(0,s.bF)(d,{visible:i.showCCompiler,onClose:t[15]||(t[15]=e=>i.showCCompiler=!1)},null,8,["visible"]),(0,s.bF)(u,{visible:i.showCppCompiler,onClose:t[16]||(t[16]=e=>i.showCppCompiler=!1)},null,8,["visible"]),(0,s.bF)(p,{visible:i.showJavaCompiler,onClose:t[17]||(t[17]=e=>i.showJavaCompiler=!1)},null,8,["visible"])])}var ye=o(2053);const we={class:"mb-6"},ke=["innerHTML"];function xe(e,t,o,r,i,a){return(0,s.uX)(),(0,s.CE)("div",we,[(0,s.bF)(n.eB,{name:"message-pop"},{default:(0,s.k6)((()=>[(0,s.Lk)("div",{class:(0,j.C4)(["flex",{"justify-end":"user"===o.message.sender}])},[(0,s.Lk)("div",{class:(0,j.C4)(["max-w-2xl rounded-2xl p-4 shadow-lg message-bubble","user"===o.message.sender?"user-message":"ai-message"])},[(0,s.Lk)("div",{class:"message-content",innerHTML:a.formattedMessage},null,8,ke)],2)],2)])),_:1})])}o(2838);var Ce=o(7453),Le=o(508),Ee=o(8716),Ie=o.n(Ee),_e={name:"ChatMessageComponent",props:{message:{type:Object,required:!0}},setup(){const e=(0,s.WQ)("runPythonCode"),t=(0,s.WQ)("showPythonInterpreter");return{runPythonCode:e,showPythonInterpreter:t}},computed:{formattedMessage(){return"ai"===this.message.sender?(Ce.xI.setOptions({highlight:function(e,t){return t&&Le.A.getLanguage(t)?Le.A.highlight(t,e).value:Le.A.highlightAuto(e).value},langPrefix:"hljs language-"}),(0,Ce.xI)(this.message.content)):this.message.content}},mounted(){this.$nextTick((()=>{this.highlightCodeBlocks()}))},updated(){this.$nextTick((()=>{this.highlightCodeBlocks()}))},methods:{highlightCodeBlocks(){this.$el.querySelectorAll("pre code").forEach((e=>{Le.A.highlightElement(e);const t=e.parentNode,o=e.classList[0].split("-")[1],n=document.createElement("div");n.className="code-toolbar";const s=document.createElement("span");s.className="lang-tag",s.textContent=o,n.appendChild(s);const r=document.createElement("button");if(r.className="copy-btn",r.textContent="Copy",n.appendChild(r),"python"===o){const e=document.createElement("button");e.className="run-btn",e.textContent="Run",n.appendChild(e)}t.insertBefore(n,t.firstChild),t.style.paddingTop="30px"})),new(Ie())(".copy-btn",{target:function(e){return e.parentNode.parentNode.querySelector("code")}});const e=e=>{this.showPythonInterpreter.value=!0,this.runPythonCode(e)};this.$el.querySelectorAll(".run-btn").forEach((t=>{t.addEventListener("click",(()=>{const o=t.parentNode.parentNode.querySelector("code"),n=o.innerText;e(n)}))}))}}};const Se=(0,v.A)(_e,[["render",xe],["__scopeId","data-v-ff4f1036"]]);var Te=Se;const Pe={key:0,class:"fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"},Me={class:"bg-white p-5 rounded-lg shadow-xl w-3/4 h-3/4 flex flex-col"},je={class:"flex justify-between items-center mb-4"},$e=(0,s.Lk)("h2",{class:"text-xl font-bold"},"Python Interpreter",-1),Ae=(0,s.Lk)("i",{class:"fas fa-times"},null,-1),Be=[Ae],Oe=(0,s.Lk)("div",{id:"python-terminal",class:"flex-grow bg-black text-white p-4 rounded overflow-auto"},null,-1);function Je(e,t,o,n,r,i){return o.show?((0,s.uX)(),(0,s.CE)("div",Pe,[(0,s.Lk)("div",Me,[(0,s.Lk)("div",je,[$e,(0,s.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>i.close&&i.close(...e)),class:"text-gray-500 hover:text-gray-700"},Be)]),Oe])])):(0,s.Q3)("",!0)}var Fe={name:"PythonInterpreter",props:{show:{type:Boolean,required:!0}},data(){return{pyodide:null,initialized:!1,codeBuffer:"",isMultiline:!1,indentLevel:0}},methods:{close(){this.$emit("close")},async loadPyodide(){if(!this.pyodide){const e=document.getElementById("python-terminal");e.innerHTML+="Loading Pyodide...<br>",this.pyodide=await loadPyodide(),this.loadTerminalPrompt()}},async runPythonInterpreter(){await this.$nextTick(),this.pyodide||await this.loadPyodide(),this.loadTerminalPrompt(),this.createInputElement()},loadTerminalPrompt(){const e=document.getElementById("python-terminal");e.innerHTML="Python 3.9.5 (default, May 3 2021, 19:12:05)<br>",e.innerHTML+="[Pyodide] on WebAssembly/JavaScript<br>",e.innerHTML+='Type "help", "copyright", "credits" or "license" for more information.<br>'},createInputElement(){const e=document.getElementById("python-terminal"),t=document.createElement("span");t.textContent=this.isMultiline?"... ":">>> ",e.appendChild(t);const o=document.createElement("input");o.type="text",o.style.background="transparent",o.style.border="none",o.style.outline="none",o.style.color="white",o.style.width="95%",e.appendChild(o),o.focus(),o.addEventListener("keydown",(async n=>{if("Enter"===n.key){const n=o.value;e.removeChild(o),e.removeChild(t),e.innerHTML+=`${t.textContent}${n}<br>`,await this.handleCommand(n)}else if("Tab"===n.key){n.preventDefault();const e=o.selectionStart,t=o.selectionEnd;o.value=o.value.substring(0,e)+"    "+o.value.substring(t),o.selectionStart=o.selectionEnd=e+4}}))},async handleCommand(e){if(""===e.trim()&&this.isMultiline)await this.runPythonCommand(this.codeBuffer),this.isMultiline=!1,this.indentLevel=0,this.codeBuffer="";else if(""===e.trim())return void this.createInputElement();this.isMultiline?(this.codeBuffer+="    ".repeat(this.indentLevel)+e+"\n",e.trim().endsWith(":")?this.indentLevel++:("return"===e.trim()||e.trim().startsWith("break")||e.trim().startsWith("continue"))&&(this.indentLevel=Math.max(0,this.indentLevel-1))):e.trim().endsWith(":")?(this.isMultiline=!0,this.indentLevel=1,this.codeBuffer=e+"\n"):await this.runPythonCommand(e),this.createInputElement()},async runPythonCommand(e){const t=document.getElementById("python-terminal");try{const o=this.processIndentation(e),n=await this.pyodide.runPythonAsync(`\n      import sys\n      from io import StringIO\n      \n      def custom_repr(obj):\n          if isinstance(obj, type):\n              return obj.__name__\n          return repr(obj)\n      \n      old_stdout = sys.stdout\n      sys.stdout = mystdout = StringIO()\n      try:\n          try:\n              result = eval(${JSON.stringify(o)}, globals())\n              if result is not None:\n                  print(custom_repr(result))\n          except SyntaxError:\n              exec(${JSON.stringify(o)}, globals())\n      except Exception as e:\n          print(str(e))\n      sys.stdout = old_stdout\n      mystdout.getvalue()\n    `);void 0!==n&&""!==n.trim()&&(t.innerHTML+=n+"<br>")}catch(o){t.innerHTML+=o.toString()+"<br>"}},processIndentation(e){return e.replace(/\t/g,"    ")},async runCode(e){this.pyodide||await this.loadPyodide(),await this.runPythonCommand(e),this.createInputElement()}},mounted(){this.runPythonInterpreter()}};const We=(0,v.A)(Fe,[["render",Je]]);var Xe=We;const Re=e=>((0,s.Qi)("data-v-0600662c"),e=e(),(0,s.jt)(),e),Ne={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},Qe={class:"bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-6 relative"},ze=Re((()=>(0,s.Lk)("svg",{class:"w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20"},[(0,s.Lk)("path",{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))),Ue=[ze],Ve=Re((()=>(0,s.Lk)("h2",{class:"text-2xl font-bold mb-4 text-gray-800"},"C Compiler",-1))),qe={class:"mb-4 relative"},He=Re((()=>(0,s.Lk)("div",{class:"code-background absolute inset-0"},null,-1))),De=Re((()=>(0,s.Lk)("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[(0,s.Lk)("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z","clip-rule":"evenodd"})],-1))),Ke={key:0,class:"mt-4 bg-green-100 rounded-md p-4"},Ge=Re((()=>(0,s.Lk)("h3",{class:"text-lg font-semibold mb-2 text-gray-800"},"Output:",-1))),Ye={class:"text-sm font-mono whitespace-pre-wrap break-words text-gray-700"},Ze={key:1,class:"mt-4 bg-red-100 rounded-md p-4"},et=Re((()=>(0,s.Lk)("h3",{class:"text-lg font-semibold mb-2 text-red-800"},"Error:",-1))),tt={class:"text-sm font-mono whitespace-pre-wrap break-words text-red-700"};function ot(e,t,o,r,i,a){return o.visible?((0,s.uX)(),(0,s.CE)("div",Ne,[(0,s.Lk)("div",Qe,[(0,s.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.close&&a.close(...e)),class:"absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200","aria-label":"Close"},Ue),Ve,(0,s.Lk)("div",qe,[He,(0,s.bo)((0,s.Lk)("textarea",{ref:"codeEditor","onUpdate:modelValue":t[1]||(t[1]=e=>i.code=e),onKeydown:t[2]||(t[2]=(...e)=>a.handleTab&&a.handleTab(...e)),placeholder:"Enter your C code here",spellcheck:"false",class:"w-full h-64 p-4 text-sm font-mono bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative z-10"},null,544),[[n.Jo,i.code]])]),(0,s.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>a.compileAndRun&&a.compileAndRun(...e)),class:"flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"},[De,(0,s.eW)(" Compile and Run ")]),i.output?((0,s.uX)(),(0,s.CE)("div",Ke,[Ge,(0,s.Lk)("pre",Ye,(0,j.v_)(i.output),1)])):(0,s.Q3)("",!0),i.error?((0,s.uX)(),(0,s.CE)("div",Ze,[et,(0,s.Lk)("pre",tt,(0,j.v_)(i.error),1)])):(0,s.Q3)("",!0)])])):(0,s.Q3)("",!0)}var nt={props:{visible:{type:Boolean,default:!1}},data(){return{code:"",output:"",error:""}},methods:{async compileAndRun(){try{const e=await ye.A.post("/compile_run_c",{code:this.code});e.data.output?(this.output=e.data.output,this.error=""):e.data.error&&(this.error=e.data.error,this.output="")}catch(e){this.error=e.response.data.error,this.output=""}},close(){this.$emit("close")},handleTab(e){if("Tab"===e.key){e.preventDefault();const t=this.$refs.codeEditor.selectionStart,o=this.$refs.codeEditor.selectionEnd;this.code=this.code.substring(0,t)+"    "+this.code.substring(o),this.$nextTick((()=>{this.$refs.codeEditor.selectionStart=this.$refs.codeEditor.selectionEnd=t+4}))}}}};const st=(0,v.A)(nt,[["render",ot],["__scopeId","data-v-0600662c"]]);var rt=st,it=o(953);const at=e=>((0,s.Qi)("data-v-28b577d8"),e=e(),(0,s.jt)(),e),lt={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},ct={class:"bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-6 relative"},dt=at((()=>(0,s.Lk)("svg",{class:"w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20"},[(0,s.Lk)("path",{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))),ut=[dt],pt=at((()=>(0,s.Lk)("h2",{class:"text-2xl font-bold mb-4 text-gray-800"},"Cpp Compiler",-1))),ht={class:"mb-4 relative"},mt=at((()=>(0,s.Lk)("div",{class:"code-background absolute inset-0"},null,-1))),ft=at((()=>(0,s.Lk)("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[(0,s.Lk)("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z","clip-rule":"evenodd"})],-1))),gt={key:0,class:"mt-4 bg-green-100 rounded-md p-4"},vt=at((()=>(0,s.Lk)("h3",{class:"text-lg font-semibold mb-2 text-gray-800"},"Output:",-1))),bt={class:"text-sm font-mono whitespace-pre-wrap break-words text-gray-700"},yt={key:1,class:"mt-4 bg-red-100 rounded-md p-4"},wt=at((()=>(0,s.Lk)("h3",{class:"text-lg font-semibold mb-2 text-red-800"},"Error:",-1))),kt={class:"text-sm font-mono whitespace-pre-wrap break-words text-red-700"};function xt(e,t,o,r,i,a){return o.visible?((0,s.uX)(),(0,s.CE)("div",lt,[(0,s.Lk)("div",ct,[(0,s.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.close&&a.close(...e)),class:"absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200","aria-label":"Close"},ut),pt,(0,s.Lk)("div",ht,[mt,(0,s.bo)((0,s.Lk)("textarea",{ref:"codeEditor","onUpdate:modelValue":t[1]||(t[1]=e=>i.code=e),onKeydown:t[2]||(t[2]=(...e)=>a.handleTab&&a.handleTab(...e)),placeholder:"Enter your Cpp code here",spellcheck:"false",class:"w-full h-64 p-4 text-sm font-mono bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative z-10"},null,544),[[n.Jo,i.code]])]),(0,s.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>a.compileAndRun&&a.compileAndRun(...e)),class:"flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"},[ft,(0,s.eW)(" Compile and Run ")]),i.output?((0,s.uX)(),(0,s.CE)("div",gt,[vt,(0,s.Lk)("pre",bt,(0,j.v_)(i.output),1)])):(0,s.Q3)("",!0),i.error?((0,s.uX)(),(0,s.CE)("div",yt,[wt,(0,s.Lk)("pre",kt,(0,j.v_)(i.error),1)])):(0,s.Q3)("",!0)])])):(0,s.Q3)("",!0)}var Ct={props:{visible:{type:Boolean,default:!1}},data(){return{code:"",output:"",error:""}},methods:{async compileAndRun(){try{const e=await ye.A.post("/compile_run_cpp",{code:this.code});e.data.output?(this.output=e.data.output,this.error=""):e.data.error&&(this.error=e.data.error,this.output="")}catch(e){this.error=e.response.data.error,this.output=""}},close(){this.$emit("close")},handleTab(e){if("Tab"===e.key){e.preventDefault();const t=this.$refs.codeEditor.selectionStart,o=this.$refs.codeEditor.selectionEnd;this.code=this.code.substring(0,t)+"    "+this.code.substring(o),this.$nextTick((()=>{this.$refs.codeEditor.selectionStart=this.$refs.codeEditor.selectionEnd=t+4}))}}}};const Lt=(0,v.A)(Ct,[["render",xt],["__scopeId","data-v-28b577d8"]]);var Et=Lt;const It=e=>((0,s.Qi)("data-v-1eb033af"),e=e(),(0,s.jt)(),e),_t={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},St={class:"bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-6 relative"},Tt=It((()=>(0,s.Lk)("svg",{class:"w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20"},[(0,s.Lk)("path",{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))),Pt=[Tt],Mt=It((()=>(0,s.Lk)("h2",{class:"text-2xl font-bold mb-4 text-gray-800"},"Java Compiler",-1))),jt={class:"mb-4 relative"},$t=It((()=>(0,s.Lk)("div",{class:"code-background absolute inset-0"},null,-1))),At=It((()=>(0,s.Lk)("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[(0,s.Lk)("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z","clip-rule":"evenodd"})],-1))),Bt={key:0,class:"mt-4 bg-green-100 rounded-md p-4"},Ot=It((()=>(0,s.Lk)("h3",{class:"text-lg font-semibold mb-2 text-gray-800"},"Output:",-1))),Jt={class:"text-sm font-mono whitespace-pre-wrap break-words text-gray-700"},Ft={key:1,class:"mt-4 bg-red-100 rounded-md p-4"},Wt=It((()=>(0,s.Lk)("h3",{class:"text-lg font-semibold mb-2 text-red-800"},"Error:",-1))),Xt={class:"text-sm font-mono whitespace-pre-wrap break-words text-red-700"};function Rt(e,t,o,r,i,a){return o.visible?((0,s.uX)(),(0,s.CE)("div",_t,[(0,s.Lk)("div",St,[(0,s.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.close&&a.close(...e)),class:"absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200","aria-label":"Close"},Pt),Mt,(0,s.Lk)("div",jt,[$t,(0,s.bo)((0,s.Lk)("textarea",{ref:"codeEditor","onUpdate:modelValue":t[1]||(t[1]=e=>i.code=e),onKeydown:t[2]||(t[2]=(...e)=>a.handleTab&&a.handleTab(...e)),placeholder:"Enter your Java code here",spellcheck:"false",class:"w-full h-64 p-4 text-sm font-mono bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative z-10"},null,544),[[n.Jo,i.code]])]),(0,s.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>a.compileAndRun&&a.compileAndRun(...e)),class:"flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"},[At,(0,s.eW)(" Compile and Run ")]),i.output?((0,s.uX)(),(0,s.CE)("div",Bt,[Ot,(0,s.Lk)("pre",Jt,(0,j.v_)(i.output),1)])):(0,s.Q3)("",!0),i.error?((0,s.uX)(),(0,s.CE)("div",Ft,[Wt,(0,s.Lk)("pre",Xt,(0,j.v_)(i.error),1)])):(0,s.Q3)("",!0)])])):(0,s.Q3)("",!0)}var Nt={props:{visible:{type:Boolean,default:!1}},data(){return{code:"",output:"",error:""}},methods:{async compileAndRun(){try{const e=await ye.A.post("/compile_run_java",{code:this.code});e.data.output?(this.output=e.data.output,this.error=""):e.data.error&&(this.error=e.data.error,this.output="")}catch(e){this.error=e.response.data.error,this.output=""}},close(){this.$emit("close")},handleTab(e){if("Tab"===e.key){e.preventDefault();const t=this.$refs.codeEditor.selectionStart,o=this.$refs.codeEditor.selectionEnd;this.code=this.code.substring(0,t)+"    "+this.code.substring(o),this.$nextTick((()=>{this.$refs.codeEditor.selectionStart=this.$refs.codeEditor.selectionEnd=t+4}))}}}};const Qt=(0,v.A)(Nt,[["render",Rt],["__scopeId","data-v-1eb033af"]]);var zt=Qt,Ut={name:"ChatInterface",data(){return{messages:[],userInput:"",conversations:(0,it.Kh)([]),currentConversationIndex:0,isLoading:!1,showPythonInterpreter:!1,showSidebar:!0,showSettings:!1,showCCompiler:!1,showCppCompiler:!1,showJavaCompiler:!1}},provide(){return{runPythonCode:this.runPythonCode,showPythonInterpreter:()=>this.showPythonInterpreter}},components:{ChatMessageComponent:Te,PythonInterpreter:Xe,CCompiler:rt,CppCompiler:Et,JavaCompiler:zt},mounted(){this.loadConversations(),this.scrollToBottom()},methods:{async sendMessage(){if(""===this.userInput.trim())return;const e={sender:"user",content:this.userInput};this.messages.push(e),this.userInput="",this.scrollToBottom(),this.isLoading=!0;try{const t=await fetch("/ask",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:e.content})}),o=t.body.getReader(),n=new TextDecoder("utf-8");let s="";while(1){const{done:e,value:t}=await o.read();if(e)break;const r=n.decode(t);s+=r,this.updateLastAIMessage(s),this.forceUpdateMessages()}await this.updateConversationTitle(),this.scrollToBottom(),this.forceUpdateMessages()}catch(t){console.error("Error:",t)}finally{this.isLoading=!1}},async updateConversationTitle(){try{const e=await fetch("/update_conversation_title",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({history_num:this.currentConversationIndex})}),t=await e.json(),{history_num:o,new_title:n}=t,s=this.conversations.findIndex((e=>e.history_num===o));-1!==s&&(this.conversations[s].title=n),console.log("now coversation",this.conversations[s]),console.log("now title",this.conversations[s].title),console.log("new title",this.conversations[s].title),this.$forceUpdate()}catch(e){console.error("Error updating conversation title:",e)}},updateLastAIMessage(e){const t=this.messages[this.messages.length-1];"ai"===t.sender?t.content=e:this.messages.push({sender:"ai",content:e}),this.$nextTick((()=>{this.highlightCodeBlocks()}))},scrollToBottom(){this.$nextTick((()=>{const e=this.$refs.chatMessages;e.scrollTop=e.scrollHeight}))},logout(){ye.A.get("/logout").then((()=>{this.$emit("logout")})).catch((e=>{console.error("Logout error:",e)}))},async loadConversations(){try{const e=await ye.A.get("/get_conversations"),t=e.data.conversations.map((e=>({history_num:e.history_num,title:e.name||"New Chat"})));this.conversations=t,this.conversations.length>0?this.conversations.some((e=>e.history_num===this.currentConversationIndex))?await this.switchConversation(this.currentConversationIndex):await this.switchConversation(this.conversations[0].history_num):(this.messages=[],this.currentConversationIndex=null)}catch(e){console.error("Error loading conversations:",e)}},async newConversation(){try{const e=await ye.A.post("/new_conversation");this.conversations.push({history_num:e.data.history_num,title:""}),console.log("num count",e.data.history_num),this.switchConversation(e.data.history_num)}catch(e){console.error("Error creating new conversation:",e)}},async switchConversation(e){if(!(this.currentConversationIndex===e&&this.messages.length>0)){this.currentConversationIndex=e,this.isLoading=!0;try{const t=await ye.A.post("/switch_conversation",{history_num:e});t.data.chat_history?this.messages=t.data.chat_history.map((e=>({sender:"HumanMessage"===e.type?"user":"ai",content:e.content}))):this.messages=[],this.$nextTick((()=>{this.scrollToBottom(),this.forceUpdateMessages()}))}catch(t){console.error("Error switching conversation:",t)}finally{this.isLoading=!1}}},forceUpdateMessages(){this.messages=this.messages.map((e=>({...e})))},async handleFileUpload(){const e=this.$refs.fileInput.files;if(0===e.length)return;const t=new FormData;for(let n=0;n<e.length;n++)t.append("files",e[n]);try{const e=await ye.A.post("/upload",t,{headers:{"Content-Type":"multipart/form-data"}});console.log(e.data.message),this.messages.push({sender:"system",content:"Files uploaded successfully"})}catch(o){console.error("Error uploading files:",o),this.messages.push({sender:"system",content:"File upload failed"})}},async deleteConversation(e){try{await ye.A.post("/delete_conversation",{history_num:e});const t=this.conversations.findIndex((t=>t.history_num===e));this.conversations.splice(t,1),this.loadConversations(),console.log("conversations length",this.conversations.length),console.log("delete num",e),e===this.currentConversationIndex?this.conversations.length>0?0===e?(this.currentConversationIndex=-1,await this.switchConversation(e),console.log("deleteConversation hit case 1")):e===this.conversations.length?(await this.switchConversation(e-1),console.log("deleteConversation hit case 2")):(this.currentConversationIndex=-1,await this.switchConversation(e),console.log("deleteConversation hit case 3")):(this.messages=[],this.currentConversationIndex=-1):this.switchConversation(this.currentConversationIndex-1)}catch(t){console.error("Error deleting conversation:",t)}},toggleSidebar(){this.showSidebar?this.showSidebar=!1:this.$nextTick((()=>{this.showSidebar=!0}))},openSettings(){this.showSettings=!0},closeSettings(){this.showSettings=!1},runPythonInterpreter(){this.showPythonInterpreter=!0,this.$nextTick((()=>{this.$refs.pythonInterpreter.runPythonInterpreter()}))},runPythonCode(e){this.showPythonInterpreter=!0,this.$nextTick((()=>{this.$refs.pythonInterpreter.runCode(e)}))},closePythonInterpreter(){this.showPythonInterpreter=!1}}};const Vt=(0,v.A)(Ut,[["render",be],["__scopeId","data-v-08a3f8fe"]]);var qt=Vt,Ht={name:"App",components:{Login:y,Register:M,ChatInterface:qt},data(){return{currentView:"login"}},methods:{onLoginSuccess(){this.currentView="chat"},showRegister(){this.currentView="register"},showLogin(){this.currentView="login"},logout(){this.currentView="login"}}};const Dt=(0,v.A)(Ht,[["render",i]]);var Kt=Dt,Gt=o(5798);const Yt=[{path:"/login",component:y},{path:"/register",component:M},{path:"/chat",component:qt}],Zt=(0,Gt.aE)({history:(0,Gt.LA)(),routes:Yt});var eo=Zt;(0,n.Ef)(Kt).use(eo).mount("#app")}},t={};function o(n){var s=t[n];if(void 0!==s)return s.exports;var r=t[n]={exports:{}};return e[n].call(r.exports,r,r.exports,o),r.exports}o.m=e,function(){var e=[];o.O=function(t,n,s,r){if(!n){var i=1/0;for(d=0;d<e.length;d++){n=e[d][0],s=e[d][1],r=e[d][2];for(var a=!0,l=0;l<n.length;l++)(!1&r||i>=r)&&Object.keys(o.O).every((function(e){return o.O[e](n[l])}))?n.splice(l--,1):(a=!1,r<i&&(i=r));if(a){e.splice(d--,1);var c=s();void 0!==c&&(t=c)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[n,s,r]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var s,r,i=n[0],a=n[1],l=n[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(s in a)o.o(a,s)&&(o.m[s]=a[s]);if(l)var d=l(o)}for(t&&t(n);c<i.length;c++)r=i[c],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(d)},n=self["webpackChunkai_chat_app"]=self["webpackChunkai_chat_app"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[504],(function(){return o(2414)}));n=o.O(n)})();
//# sourceMappingURL=app.3cbd9030.js.map