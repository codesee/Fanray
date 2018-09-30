var app=new Vue({el:"#app",mixins:[blogComposeMixin],data:()=>({pubClicked:!1,pubText:"",saveVisible:!1,saveDisabled:!1,saveText:"Save",closing:!0,fieldChanged:!1,drawer:null,panel:[!0,!0,!0],menuDate:!1,mediaDialogVisible:!1,progressVisible:!1,editor:null,snackbar:{show:!1,text:"",color:""}}),computed:{disablePubButton(){return 0>=this.post.title.trim().length||this.pubClicked},tok:function(){return document.querySelector("input[name=\"__RequestVerificationToken\"][type=\"hidden\"]").value},headers(){return{headers:{"XSRF-TOKEN":this.tok}}},payload:function(){return{id:this.post.id,postDate:this.post.postDate,categoryId:this.post.categoryId,tags:this.post.tags,slug:this.post.slug,excerpt:this.post.excerpt,title:this.post.title,body:this.editor.getData()}}},mounted(){this.pubText=this.post.published?"Update":"Publish",this.initEditor()},methods:{initEditor(){let a,b=this;ClassicEditor.create(document.querySelector("#editor"),{autosave:{save(){clearTimeout(a),b.post.published||(b.saveVisible=!0,b.saveDisabled=!1,b.saveText="Save",a=setTimeout(b.saveDraft,b.autosaveInterval))}}}).then(a=>{b.editor=a}).catch(()=>{})},onFieldsChange(){this.fieldChanged=!0;this.post.published||(this.saveVisible=!0,this.saveDisabled=!1,this.saveText="Save")},saveDraft(){this.saveVisible=!0,this.saveDisabled=!0,this.saveText="Saving...",axios.post("/admin/compose?handler=save",this.payload,{headers:{"XSRF-TOKEN":this.tok}}).then(a=>{this.post.id=a.data.id,this.post.slug=a.data.slug,this.post.draftDate=a.data.draftDate,this.post.isDraft=!0,window.location.href.endsWith("/compose")&&history.replaceState({},null,window.location.href+`/${this.post.id}`)}).catch(()=>{}),this.fieldChanged=!1,this.saveText="Saved"},revert(){this.post.published=!1,this.pubText=this.post.published?"Update":"Publish",this.saveDraft()},pub(){this.closing=!1,this.pubClicked=!0,this.pubText=this.post.published?"Updating...":"Publishing...";const a=this.post.published?"/admin/compose?handler=update":"/admin/compose?handler=publish";axios.post(a,this.payload,{headers:{"XSRF-TOKEN":this.tok}}).then(a=>{window.location.replace(a.data)}).catch(()=>{})},insertImages(a){let b="";for(var c=0;c<a.length;c++)b+=`<figure class="image"><img src="${a[c].urlMedium}" alt="${a[c].alt}" title="${a[c].title}"><figcaption>${a[c].caption}</figcaption></figure>`;const d=this.editor.data.processor.toView(b),e=this.editor.data.toModel(d);this.editor.model.insertContent(e,this.editor.model.document.selection),this.mediaDialogVisible=!1},titleEnter(){this.post.title=this.post.title.replace(/\n/g," ")},toast(a,b="silver"){this.snackbar.show=!0,this.snackbar.text=a,this.snackbar.color=b},toastError(a){this.snackbar.show=!0,this.snackbar.text=a,this.snackbar.color="red"}}});
//# sourceMappingURL=blog-compose.js.map