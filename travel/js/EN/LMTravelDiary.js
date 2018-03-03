var focusCur;
var LMTravelDiary = {
	init:function(){
		var bookLeft;
		var bookRight;
		var focusCur;
		var selFocus;
		var bookLeftHeight=0;
		var bookRightHeight=0;
		this.insertZHEvent();
		this.otherEvent();
		this.diaryEditor();
		this.spectrumEvent();
		this.insertimageEvent();
	},

	/* 编辑器加载 */
	diaryEditor:function(){
		initHtmlBuilder();
		var optionLeft = {
	        element: $('.p-diary-book-left').get(0),
	        onkeypress: function( code, character, shiftKey, altKey, ctrlKey, metaKey ) {
				var curObj = bookLeft.getElement();
            	var curLast = curObj.lastChild;
            	var curHeight = 0;
            	var curWidth=0;
            	try {
            		var num= curLast.innerText.split(' ');
            		curWidth = (num.length*2+curLast.innerText.replace(/[^\x00-\xff]/g,"01").length)* 7;
            	} catch(e) {
            		//TODO handle the exception
            	}
            	if(curLast!=null){
            		if(curLast.offsetTop!=null){
            			curHeight=curLast.offsetTop;
            			if(curLast.clientHeight!=null){
            				curHeight=curHeight+curLast.offsetHeight;
            			}
            		}else{
            			if(curLast.previousSibling!=null)
            			curHeight=curLast.previousSibling.offsetTop;
            			if(curLast.previousSibling!=null&&curLast.previousSibling.clientHeight!=null){
            				curHeight=curHeight+curLast.previousSibling.offsetHeight;
            			}
            		}
            	}
                if(ctrlKey&&character=='V')return false;
                if( typeof console != 'undefined' && code!=13&&code!=8){
                	if(curWidth>=553&&(curHeight+20>760))return false;
                	if(curHeight>=760){
                		return false;
                	}
                }else if(code==13){
                	if(curHeight+10>=760){
                		return false;
                	}
                }else if(code==8){
                	if(curHeight-20<=760){
                		return true;
                	}
                }
            },
	        onselection: function( collapsed, rect, nodes, rightclick ) {
                if( typeof console != 'undefined' && rect ){
                		//bookLeftHeight = rect.top;
                	//console.log( 'RAW: selection rect('+rect.left+','+rect.top+','+rect.width+','+rect.height+'), '+nodes.length+' nodes' );
                }
            },
	        onplaceholder: function( visible ) {
                if( typeof console != 'undefined' ){
                	//console.log( 'RAW: placeholder ' + (visible ? 'visible' : 'hidden') );
                }
            }
	    };
		/*常用按钮调用*/
		var optionRight = {
	        element: $('.p-diary-book-right').get(0),
	        onkeypress: function( code, character, shiftKey, altKey, ctrlKey, metaKey ) {
				var curObj = bookRight.getElement();
            	var curLast = curObj.lastChild;
            	var curHeight = 0;
            	var curWidth=0;
            	try {
            		var num= curLast.innerText.split(' ');
            		curWidth = (num.length*2+curLast.innerText.replace(/[^\x00-\xff]/g,"01").length)* 7;
            	} catch(e) {
            		//TODO handle the exception
            	}
            	if(curLast!=null){
            		if(curLast.offsetTop!=null){
            			curHeight=curLast.offsetTop;
            			if(curLast.clientHeight!=null){
            				curHeight=curHeight+curLast.offsetHeight;
            			}
            		}else{
            			if(curLast.previousSibling!=null)
            			curHeight=curLast.previousSibling.offsetTop;
            			if(curLast.previousSibling!=null&&curLast.previousSibling.clientHeight!=null){
            				curHeight=curHeight+curLast.previousSibling.offsetHeight;
            			}
            		}
            	}
            	if(ctrlKey&&character=='V')return false;
                if( typeof console != 'undefined' && code!=13&&code!=8){
                	if(curWidth>=553&&(curHeight+20>760))return false;
                	if(curHeight>=760){
                		return false;
                	}
                }else if(code==13){
                	if(curHeight+10>=760){
                		return false;
                	}
                }
                else if(code==8){
                	if(curHeight-20<=760){
                		return true;
                	}
                }
            },
	        onselection: function( collapsed, rect, nodes, rightclick ) {
                if( typeof console != 'undefined' && rect ){
                	bookRightHeight = rect.top;
                	//console.log( 'RAW: selection rect('+rect.left+','+rect.top+','+rect.width+','+rect.height+'), '+nodes.length+' nodes' );
                }
            },
	        onplaceholder: function( visible ) {
                if( typeof console != 'undefined' ){
                	//console.log( 'RAW: placeholder ' + (visible ? 'visible' : 'hidden') );
                }
            }
	    };
	    bookLeft = wysiwyg(optionLeft);
	    bookRight = wysiwyg( optionRight );
	    focusCur = 'left';
	    /*保存内容事件*/
	   $('#book-save').click(function(){
	   		var next= $('.nextPage')[0];
	   		next.click();
	   		console.log('bookleft:'+bookLeft.getHTML());
	   		console.log('bookright:'+bookRight.getHTML());
	   });
	   /*下一页事件*/
	   $('#book-next').click(function(){
	   		var next= $('.nextPage')[0];
	   		next.click();
	   		console.log('bookleft:'+bookLeft.getHTML());
	   		console.log('bookright:'+bookRight.getHTML());
	   		bookLeft.setHTML('');
	   		bookRight.setHTML('');
	   });
	   $('.p-diary-book-right').focus(function(){
	   		focusCur='right';
	   		if( window.getSelection )
	        {
	            var sel = window.getSelection();
	            if( sel.rangeCount > 0 )
	            selFocus= sel.getRangeAt(0);
	        }
	        else if( document.selection )
	        {
	            var sel = document.selection;
	            selFocus= sel.createRange();
	        }
	   });
	   $('.p-diary-book-left').focus(function(){
	   		focusCur='left';
	   		if( window.getSelection )
	        {
	            var sel = window.getSelection();
	            if( sel.rangeCount > 0 )
	            selFocus= sel.getRangeAt(0);
	        }
	        else if( document.selection )
	        {
	            var sel = document.selection;
	            selFocus= sel.createRange();
	        }
	   });
	   $('.p-diary-book-right').click(function(){
	   		focusCur='right';
		   	if( window.getSelection )
	        {
	            var sel = window.getSelection();
	            if( sel.rangeCount > 0 )
	            selFocus= sel.getRangeAt(0);
	        }
	        else if( document.selection )
	        {
	            var sel = document.selection;
	            selFocus= sel.createRange();
	        }
	   });
	   $('.p-diary-book-left').click(function(){
	   		focusCur='left';
		   	if( window.getSelection )
	        {
	            var sel = window.getSelection();
	            if( sel.rangeCount > 0 )
	            selFocus= sel.getRangeAt(0);
	        }
	        else if( document.selection )
	        {
	            var sel = document.selection;
	            selFocus= sel.createRange();
	        }
	   });
	   $('.p-diary-book-right').focus();
	   $('.p-diary-book-left').focus();
	},

	/*调色板事件*/
	spectrumEvent:function(){
		var bgSelect = 'left';
		$("#bgUpload").spectrum({
		    color: "#ECC",
		    showInput: true,
		    className: "full-spectrum",
		    showInitial: true,
		    checkRadioText:'left',
		    showPalette: true,
		    showSelectionPalette: true,
		    maxSelectionSize: 10,
		    preferredFormat: "hex",
		    localStorageKey: "spectrum.demo",
		    move: function (color) {
		        
		    },
		    show: function () {
		    
		    },
		    beforeShow: function () {
		    
		    },
		    hide: function () {
		    
		    },
		    change: function(color) {
		    	var selectColor = color.toHexString();
		    	var bgSelect = color.getbgSelect();
		    	if(selectColor!='#ffffff'){
		    		if(bgSelect=='left'){
		        		$('.p-diary-book-left').get(0).style.backgroundColor=selectColor;
			        }else if(bgSelect=='right'){
			        	$('.p-diary-book-right').get(0).style.backgroundColor=selectColor;
			        }else{
			        	$('.p-diary-book-left').get(0).style.backgroundColor=selectColor;
			        }
		    	}else{
		    		if(bgSelect=='left'){
		        		$('.p-diary-book-left').get(0).style="";
			        }else if(bgSelect=='right'){
			        	$('.p-diary-book-right').get(0).style="";
			        }else{
			        	$('.p-diary-book-right').get(0).style="";
			        	$('.p-diary-book-left').get(0).style="";
			        }
		    		
		    	}
		    },
		    palette: [
		        ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
		        "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
		        ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
		        "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"], 
		        ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", 
		        "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", 
		        "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", 
		        "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", 
		        "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", 
		        "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
		        "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
		        "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
		        "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", 
		        "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
		    ]
		});
	},

	/*中文输入法监控*/
	insertZHEvent:function(){
		window.oninput = function(e){
			var html;
			var curObj;
			if(focusCur=='left'){
				html = $('.p-diary-book-left').innerHTML;
				curObj = bookLeft.getElement();
			}else if(focusCur=='right'){
				html = $('.p-diary-book-right').innerHTML;
				curObj = bookRight.getElement();
			}
	          
	         
        	var curLast = curObj.lastChild;
        	var curHeight = 0;
        	var curWidth=0;
        	try {
        		var num= curLast.innerText.split(' ');
        		curWidth = (num.length*2+curLast.innerText.replace(/[^\x00-\xff]/g,"01").length)* 7;
        	} catch(e) {
        		//TODO handle the exception
        	}
        	if(curLast!=null){
        		if(curLast.offsetTop!=null){
        			curHeight=curLast.offsetTop;
        			if(curLast.clientHeight!=null){
        				curHeight=curHeight+curLast.offsetHeight;
        			}
        		}else{
        			if(curLast.previousSibling!=null)
        			curHeight=curLast.previousSibling.offsetTop;
        			if(curLast.previousSibling!=null&&curLast.previousSibling.clientHeight!=null){
        				curHeight=curHeight+curLast.previousSibling.offsetHeight;
        			}
        		}
        	}
			// console.log(e.data);
			 
	         // console.log(len);
	         if(e.keyCode != 8 &&curLast!=null&&curHeight>=760) {
	         	var newH = curLast.innerHTML.replace(e.data,"");
	         	curLast.innerHTML = newH;
	         	if(focusCur=='left'){
	         		bookRight.insertHTML(e.data);
	         		$('.p-diary-book-right').focus();
	         	}
	         	// $('#txt').focus();  
	         	getC(curObj)
	         	function getC(that){  
	         		if(document.all){  
	         			that.range=document.selection.createRange();  
	         			that.range.select();  
	         			that.range.moveStart("character",-1);   
	         		}else{  
	         			that.range=window.getSelection().getRangeAt(0);  
	         			that.range.setStart(that.range.startContainer,curLast.innerHTML.length);  
	              var sel = window.getSelection();  
	              sel.removeAllRanges();  
	         		}  
	         	}  
	         	return false;
	         	e.preventDefault();
	         }
	     }
	},

	/* 上传图片 */
	insertimageEvent:function(){
		$("#playVideo,#playAudio").click(function(){
			if( focusCur==null ||focusCur=="" ){
				layer.msg('请选择需要上传的位置', {icon: 2});
				return;
			}
			if($('#playAudioSpan').hasClass('glyphicon-signal')){
				$('#popup').show();
			}
			
		});
		$('#picUpload').click(function(){
			if(focusCur=='left')$('#lanmei-image-left').click();
			if(focusCur=='right')$('#lanmei-image-right').click();
		});
	},
	
	/* 其他事件 */
	otherEvent:function(){
		//上传音频
		//var type="";//参数为1:视频，2：音频
		$('#playVideo,#playAudio').click(function(e){
			var title="";
			var id=e.currentTarget.id;
		if(id=="playVideo"){
			title="Upload Video";	
			//type="1";
			$('#popup').attr('type','1');
		}
		if(id=="playAudio"){
			title="Upload Audio";	
			//type="2";
			$('#popup').attr('type','2');
			if(!$('.radioPlay').hasClass('glyphicon-signal')){
				playVid();	
			}
		}
		if( id=="playVideo" || (id=="playAudio" && $('.radioPlay').hasClass('glyphicon-signal'))){
			//showuploadfile(insertAudio,title);
			$('#popupTitle').html(title);
			$('#popup').show();
		}
		});
		
		//移入显示隐藏音频tip
		var t=null;
		$(".upload-play").hover(function (){
			clearTimeout(t);
			if($(this).find('.glyphicon-play').length>0||$(this).find('.glyphicon-pause').length>0){
				$(".play-tips").show(200);  
			}
        },function(){
        	t= setTimeout('$(".play-tips").hide()',500);
        });
		
        $('.play-tips').mouseover(function (){
        	clearTimeout(t);
			$(this).show();  
        }); 
        $('.play-tips').mouseout(function(){
        	$('.play-tips').hide();
        });
        
		//分页调用
		$(".t-comment-page").createPage({
		    pageCount:10,
		    current:1,
		    previous:'Previous',
		    next:'Next',
		    backFn:function(p){
		        
		    }
		});
		//移入移出效果
		$('.p-bg-ul').on('click','.upload',function(){
			$(this).addClass('active').siblings().removeClass('active');
		});
		//添加背景图
		//阻止事件冒泡
        function stopPropagation(e) { 
        	if (e.stopPropagation) 
        	e.stopPropagation(); 
        	else 
        	e.cancelBubble = true; 
        } 
        $(document).click(function(){
		    $('.uploadbg-tip').hide();
		    $('.removebg-tip').hide();
		});
		$('.p-diary-upload').click(function(e){
			stopPropagation(e); 
			if($('.uploadbg-tip').is(":hidden")){
		    	$('.uploadbg-tip').show();
		    }else{
		    	$('.uploadbg-tip').hide();
		    }
		});
		
		$(".uploadbg-tip .btn-l").click(function(){
			$("#bguploadfile_l").click();
		});
		$(".uploadbg-tip .btn-r").click(function(){
			$("#bguploadfile_r").click();
		});
		var loadbgImageFile = function(file,classname){
            var reader = new FileReader();
            // Read in the image file as a data URL
            reader.readAsDataURL( file );
              var dataurl=null;
            reader.onload = function(event) {
               dataurl= event.target.result;
               $("."+classname).css("background-image","url("+dataurl+")");
            };
	 	 };		
		$("#bguploadfile_l").change(function(){
			var files=$('#bguploadfile_l').prop('files');
			if(files.length>0){
				if( ! files[0].type.match('image.*') ){
					layer.msg('请上传正确图片文件', {icon: 2});
					return;
				}
				var classname="p-diary-book-left";
				var dataurl=loadbgImageFile(files[0],classname);
			}
		});
		$("#bguploadfile_r").change(function(){
			var files=$('#bguploadfile_r').prop('files');
			if(files.length>0){
				if( ! files[0].type.match('image.*') ){
					layer.msg('请上传正确图片文件', {icon: 2});
					return;
				}
				var classname="p-diary-book-right";
				var dataurl=loadbgImageFile(files[0],classname);
			}
		});
		
		//移除背景图
		$('.p-diary-remove').click(function(e){
			stopPropagation(e); 
			if($('.removebg-tip').is(":hidden")){
		    	$('.removebg-tip').show();
		    }else{
		    	$('.removebg-tip').hide();
		    }
		});
		$('#removebgL').on('click',function(){
			$(".p-diary-book-left").css("background-image","url('')");//左背景
		});
		$('#removebgR').on('click',function(){
			$(".p-diary-book-right").css("background-image","url('')");//右背景
		});
	}
};

function initHtmlBuilder (){
$('.p-diary-book-left,.p-diary-book-right').each( function(index, element)
 {
	$(element).wysiwyg({
			classes: 'some-more-classes',
			position:'top-selection',
			buttons: {
				forecolor: {
					title: 'Text color',
					image:'<img src="../../libs/wysiwyg/image/icon_color.png" width="20"  height="20" alt="" />',
					hotkey: 'c',
					showstatic: false,
					showselection: true
				},
				insertimage: {
					title: 'Insert image',
					booktype:index == 0 ? 'left' : 'right',
					image: '\uf030', // <img src="path/to/image.png" width="16" height="16" alt="" />
					showstatic: true, // wanted on the toolbar
					showselection: false // wanted on selection
				},
				insertlink: {
					title: 'Insert link',
					image: '\uf08e', // <img src="path/to/image.png" width="16" height="16" alt="" />
					showstatic: false,
					showselection: false
				},
				fontsize: {
					title: 'Size',
					style: 'color:white;background:red',      // you can pass any property - example: "style"
                    //image: '\uf034', 
                    image: '<select id="booksize" onchange="clickbooksize()" style="background:#f7faff;border-radius:4px;width:70px;height:30px;border: 0;font-family: Comfortaa;font-size: 14px;color: #1f2c5c;letter-spacing: 0;text-align: left;">'+
								'<option class="bookselect" >14px</option><option class="bookselect" >18px</option><option class="bookselect" >24px</option></select>'+
								'<input type="hidden" id="bookclick" /> ',
					popup: function($popup, $button, $editor) {
						  			
                           },
					showstatic: false, // wanted on the toolbar
					showselection: true // wanted on selection
				},
				bold: {
					title: 'Bold (Ctrl+B)',
					//image: '\uf032', // <img src="path/to/image.png" width="16" height="16" alt="" />
					image:'<img src="../../libs/wysiwyg/image/icon_bold.png" width="20"  height="20" alt="" />',
					hotkey: 'b',
					showstatic: false,
					showselection: true
				},
				italic: {
					title: 'Italic (Ctrl+I)',
					//image: '\uf033', // <img src="path/to/image.png" width="16" height="16" alt="" />
					image:'<img src="../../libs/wysiwyg/image/icon_italic.png" width="20"  height="20" alt="" />',
					hotkey: 'i',
					showstatic: false,
					showselection: true
				},
				underline: {
					title: 'Underline (Ctrl+U)',
					//image: '\uf0cd', // <img src="path/to/image.png" width="16" height="16" alt="" />
					image:'<img src="../../libs/wysiwyg/image/icon_underline.png" width="20"  height="20" alt="" />',
					hotkey: 'u',
					showstatic: false,
					showselection: true
				},
				alignleft: {
					title: 'Left',
					//image: '\uf036', // <img src="path/to/image.png" width="16" height="16" alt="" />
					image:'<img src="../../libs/wysiwyg/image/icon_left.png" width="20"  height="20" alt="" />',
					showstatic: false,
					showselection: true // wanted on selection
				},
				aligncenter: {
					title: 'Center',
					//image: '\uf037', // <img src="path/to/image.png" width="16" height="16" alt="" />
					image:'<img src="../../libs/wysiwyg/image/icon_center.png" width="20"  height="20" alt="" />',
					showstatic: false,
					showselection: true // wanted on selection
				},
				alignright: {
					title: 'Right',
					//image: '\uf038', // <img src="path/to/image.png" width="16" height="16" alt="" />
					image:'<img src="../../libs/wysiwyg/image/icon_right.png" width="20"  height="20" alt="" />',
					showstatic: false,
					showselection: true // wanted on selection
				},
				alignjustify: {
					title: 'Justify',
					image: '\uf039', // <img src="path/to/image.png" width="16" height="16" alt="" />
					showstatic: false,
					showselection: false // wanted on selection
				},
				removeformat: {
					title: 'Remove format',
					image: '\uf12d', // <img src="path/to/image.png" width="16" height="16" alt="" />
					showstatic: false,
					showselection: false
				}
			},
			// Submit-Button
			submit: {
				title: 'Submit',
				image: '\uf00c' // <img src="path/to/image.png" width="16" height="16" alt="" />
			},
			// Other properties
			dropfileclick: 'Drop image or click',
			booktype:index == 0 ? 'left' : 'right',
			placeholderUrl: 'lanmei air port',
			maxImageSize: [600, 200]
			/*
					            onImageUpload: function( insert_image ) {
					                            // Used to insert an image without XMLHttpRequest 2
					                            // A bit tricky, because we can't easily upload a file
					                            // via '$.ajax()' on a legacy browser.
					                            // You have to submit the form into to a '<iframe/>' element.
					                            // Call 'insert_image(url)' as soon as the file is online
					                            // and the URL is available.
					                            // Best way to do: http://malsup.com/jquery/form/
					                            // For example:
					                            //$(this).parents('form')
					                            //       .attr('action','/path/to/file')
					                            //       .attr('method','POST')
					                            //       .attr('enctype','multipart/form-data')
					                            //       .ajaxSubmit({
					                            //          success: function(xhrdata,textStatus,jqXHR){
					                            //            var image_url = xhrdata;
					                            //            console.log( 'URL: ' + image_url );
					                            //            insert_image( image_url );
					                            //          }
					                            //        });
					                        },
					            onKeyEnter: function() {
					                            return false; // swallow enter
					                        }
					            */
		})
		.change(function() {
			//if(typeof console != 'undefined')console.log('change');
		})
		.focus(function() {
			//if(typeof console != 'undefined')console.log('focus');
		})
		.blur(function() {
			if(typeof console != 'undefined'){
				console.log('blur');
			}
			if( window.getSelection )
	        {
	            var sel = window.getSelection();
	            if( sel.rangeCount > 0 )
	            selFocus= sel.getRangeAt(0);
	        }
	        else if( document.selection )
	        {
	            var sel = document.selection;
	            selFocus= sel.createRange();
	        }
		});
	
	});
	
}
$(document).ready(function($) {
	LMTravelDiary.init();
});


//文件上传
function fileUpload2(type){
	var chooseFileType = $('#popup').attr('type');
	var files=$('input[name="fileTrans"]').prop('files');
	if(files.length>0){
		var fileType=files[0].type;
		//chooseFileType=0图片
		if(chooseFileType == '0'){
			if( ! fileType.match('image.*') ){
				layer.msg('请上传正确图片文件', {icon: 2});
				return;
			}else{
				var reader = new FileReader();
				// Read in the image file as a data URL
                reader.readAsDataURL( files[0] );
                reader.onload = function(event) {
	                var dataurl = event.target.result;
	                var filename = files[0].name;
	                var curObj = bookLeft.getElement();
					var curLast = curObj.lastChild;
					if(focusCur=='right'){
				    	curObj = bookRight.getElement();
				    	curLast = bookRight.lastChild;
				    }
					var html = '<img id="wysiwyg-insert-image" src="'+dataurl+'" alt=""' + (filename ? ' title="'+filename.replace(/"/,'&quot;')+'"' : '') + ' />';
				    if(focusCur=='left'){
				    	bookLeft.insertHTML( html ).collapseSelection();
				    }else if(focusCur=='right'){
				    	bookRight.insertHTML( html ).collapseSelection();
				    }
	                $('#popup').hide();
				}
			}
        }
		//chooseFileType=2 音频
		if(chooseFileType=='2'){
			if(fileType=="audio/mp3"||fileType=="audio/ogg"||fileType=="audio/mp4"){
				var status=true;//上传处理状态：false失败，true成功
				//上传文件后台处理过程
				//上传成功后执行
				if(status){
					$('.radioPlay').removeClass('glyphicon-signal').addClass('glyphicon-play');
				    layer.closeAll();
				    $('#tipName').html(files[0].name);//显示上传成功的文件名
				    layer.msg('上传成功', {icon: 1});
				    $('#popup').hide();
				}else{
					//上传失败
					layer.msg('上传文件失败', {icon: 2});	
				}
			}else{
				layer.msg('请上传正确格式音频文件', {icon: 2});
			}
		}
		//chooseFileType=1 视频
		if(chooseFileType==1){
			if(fileType=="video/ogg"||fileType=="video/mp4"){
			var status=true;//上传处理状态：false失败，true成功
				//上传文件后台处理过程
				//上传成功后执行
				if(status){
					var url="http://jq22com.qiniudn.com/jq22-sp.mp4";
					var videohtml='<video src="'+url+'" controls="" preload="auto" width="99%"></video>&nbsp;';
					if(focusCur=='left'){
				    	bookLeft.insertHTML( videohtml ).collapseSelection();
				    }else if(focusCur=='right'){
				    	bookRight.insertHTML( videohtml ).collapseSelection();
				    }
					
					$('#popup').hide();
				}else{
					//上传失败
					layer.msg('上传文件失败', {icon: 2});
				}
			}else{
				layer.msg('请上传正确格式视频文件', {icon: 2});	
			}
		}
		
	}
	
};

function showName(obj){
	var file = obj.files;
	if(file.length>0){
		var fileName=file[0].name;
		$('#fileName').html(fileName);
	}
}

//播放音频
function playVid() {
	var audio = $("#MyAudio")[0];
	var status =  $('#radioStatus').val();
	var audioSrc = $('#audioSrc').attr('src');
	if(audioSrc == '' || audioSrc == null){
		layer.msg('No audio file, please upload the file!');
	}else{
		if(status==1){
			audio.play(); 
			$('#radioStatus').val(0);
			$('.radioPlay').removeClass('glyphicon-play').addClass('glyphicon-pause');
		}else{
			audio.pause();
			$('#radioStatus').val(1);
			$('.radioPlay').removeClass('glyphicon-pause').addClass('glyphicon-play');
		}
	}
 }
//重新上传音频
function reupload(){
	/*var insertAudio='<div class="wysiwyg-toolbar-form" unselectable="on">'+
						'<div class="wysiwyg-browse">Drop file or click'+
							'<input id="radioFile" type="file" name="fileTrans" onchange="showName(this)" draggable="true" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; opacity: 0; cursor: pointer;">'+
						'</div>'+
						'<p id="fileName"></p>'+
						'<div class="btn-div">'+
							'<button type="button" class="insertBtn" id="fileUpload" onclick="fileUpload(2)">File Upload</button>'+
							'</div>'+
						'</div>';
showuploadfile(insertAudio,"重新上传音频文件");	*/
	$('#popup').show();
	$('#popupTitle').html('重新上传音频文件');
	$("#fileName").html("");
	$('input[name="fileTrans"]').val('');
}


//关闭弹窗
function popupClose(){
	$("#fileName").html("");
	$('input[name="fileTrans"]').val('');
	$('#popup').hide();
}
//确认点击字体大小事件
function clickbooksize(){
	$('#bookclick').val('true');
}
