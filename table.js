/**
 * Created by Administrator on 2017/5/30.
 */
$.fn.extend({
	setTable: function (object) {
		var el = this[0];
		el.style.border = '1px solid #ddd'
		el.style.borderCollapse = 'collapse';
		el.style.borderSpacing = '0';

		if (typeof object.data=='string') {
			$.get(object.data).done((data)=>{
				finish(data)
			}).fail((err)=>{
				alert('请求数据错误')
			})
		}else {
			finish();
		}

		function finish(data) {
			var obj = {
				//行宽和列高
				lineWidth: object.lineWidth || 200,
				lineHeight: object.lineHeight || 40,
				//标题行
				title: object.title,
				//隔行变色,默认为白色，不需设置
				color: {
					title: object.color.title || 'white',
					odd: object.color.odd || 'white',
					even: object.color.even || 'white',
					hover: object.color.hover || '#666'
				},
				//是否分页，默认不分页
				page: object.page,
				//数据  在线url或者数组
				data: data || object.data
			};

			//设置判断
			function class2type(obj1, type) {
				type = type || 'Object';
				return !!Object.prototype.toString.call(obj1).indexOf(type)
			}

			if (!(class2type(obj) && class2type(obj.title,'Array'))) {
				alert('请设置正确的属性')
				return;
			}

			//插入表头
			var thead = document.createElement('thead');
			var tr = document.createElement('tr');
			for (var i = 0; i < obj.title.length; i++) {
				var th = document.createElement('th');
				th.innerHTML = obj.title[i];
				tr.appendChild(th);
			}
			thead.appendChild(tr);

			//插入数据
			var tbody = document.createElement('tbody');
			if (!obj.page.status) {
				for (var i = 0; i < obj.data.length; i++) {
					var tr = document.createElement('tr');
					for (var k in obj.data[i]) {
						var td = document.createElement('td');
						td.innerHTML = obj.data[i][k];
						tr.appendChild(td);
					}
					tbody.appendChild(tr);

				}
			}else {
				var data=obj.data
				if (obj.data.length<=obj.page.max) {
					for(var i=0;i<obj.data.length;i++){
						var tr = document.createElement('tr');
						for (var k in obj.data[i]) {
							var td = document.createElement('td');
							td.innerHTML = obj.data[i][k];
							tr.appendChild(td);
						}
						tbody.appendChild(tr);
					}
				}else {
					for(var i=0;i<obj.page.max;i++){
						var tr = document.createElement('tr');
						for (var k in obj.data[i]) {
							var td = document.createElement('td');
							td.innerHTML = obj.data[i][k];
							tr.appendChild(td);
						}
						tbody.appendChild(tr);
					}
				}
				var div = document.createElement('div');
				div.className = 'down';
				div.style.display = 'inline-block';
				div.style.textAlign = 'center';
				div.style.marginTop = '5px';
				div.style.width = obj.lineWidth * obj.title.length + 'px';
				var index = Math.ceil(obj.data.length / obj.page.max);
				for(var i=0;i<index;i++){
					$('<a href="#">' + (i+1) + '</a>').appendTo(div)
				}
				for(var i=0;i<div.children.length;i++){
					div.children[i].style.display = 'inline-block';
					div.children[i].style.width='25px'
					div.children[i].style.margin='0 2px'
					div.children[i].style.textDecoration = 'none';
					div.children[i].style.border = '1px solid #ccc';
					div.children[i].style.lineHeight = '25px';
					div.children[i].style.color = '#8a8a8a';

					(function (i) {
						div.children[i].onclick = function () {
							for(var j=0;j<div.children.length;j++){
								div.children[j].style.backgroundColor = '#fff';
								div.children[j].style.color = '#8a8a8a';
								div.children[j].style.borderColor = '#ccc';
							}
							div.children[i].style.backgroundColor = '#3897cd';
							div.children[i].style.color = '#fff';
							div.children[i].style.borderColor = '#3897cd';
						};
					})(i)

				}
				document.body.appendChild(div)
				$('.down a').each(function () {
					$(this).on('click', function () {
						$('tbody tr').remove();
						var result=this.innerText<index?obj.page.max:(obj.data.length-index*obj.page.max+obj.page.max)
						for(var i=0;i<result;i++){
							var tr = document.createElement('tr');
							for (var k in obj.data[(this.innerText-1)*obj.page.max+i]) {
								var td = document.createElement('td');
								td.innerHTML = obj.data[(this.innerText-1)*obj.page.max+i][k];
								tr.appendChild(td);
							}
							tbody.appendChild(tr);
						}
						render()
					});

				})


			}
			el.appendChild(thead);
			el.appendChild(tbody);
			render()
			//设置宽高和背景色
			for(var i=0;i<document.querySelectorAll('th').length;i++){
				document.querySelectorAll('th')[i].style.height = obj.lineHeight + 'px';
				document.querySelectorAll('th')[i].style.width = obj.lineWidth + 'px';
				document.querySelectorAll('th')[i].style.border='1px solid #ddd'
				document.querySelectorAll('th')[i].style.borderBottom='2px solid #ddd'
			}

			function render() {
				for(var i=0;i<document.querySelectorAll('td').length;i++){
					document.querySelectorAll('td')[i].style.height = obj.lineHeight + 'px';
					document.querySelectorAll('td')[i].style.width = obj.lineWidth + 'px';
					document.querySelectorAll('td')[i].style.border='1px solid #ddd'

				}
				document.querySelector('thead tr').style.backgroundColor = obj.color.title;
				for(var i=0;i<document.querySelectorAll('tbody tr').length;i++){
					if (i%2) {
						document.querySelectorAll('tbody tr')[i].style.backgroundColor = obj.color.even;
					}else {
						document.querySelectorAll('tbody tr')[i].style.backgroundColor = obj.color.odd;
					}

					(function (i) {
						var currentColor = '';
						document.querySelectorAll('tbody tr')[i].onmouseover=function () {
							currentColor = document.querySelectorAll('tbody tr')[i].style.backgroundColor;
							document.querySelectorAll('tbody tr')[i].style.backgroundColor = obj.color.hover;
						}
						document.querySelectorAll('tbody tr')[i].onmouseout=function () {
							document.querySelectorAll('tbody tr')[i].style.backgroundColor = currentColor
						}
					})(i)
				}
			}
		}



	}






});




