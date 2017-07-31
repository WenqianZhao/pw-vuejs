const messages = {
	// English
	en: {
		navbar: {
			Home: "Home",
			Blog: "Blog",
			Apps: "Apps",
			todoList: "ToDoList App",
			loveSoccor: "Love Soccer",
			simpleTB: "Simple taobao",
			About: "About",
			Admin: "Admin",
			signup: "Sign Up",
			Welcome: "Welcome",
			Account: "Account",
			Logout: "Logout",
			Login: "Login",
			Contact: "Contact",
		},
		login: {
			Email: "Email",
			Password: "Password",
			checkEmail: "Please input your email address",
			checkEmail2: "Please input the valid email",
			checkPassword: "Please input your password",
			Submit: "Submit",
			Reset: "Reset",
			cong: "Congratulations",
			loginSuccess: "Login successfully!",
		},
		signup: {
			Username: "Username",
			cfpassword: "Confirm Password",
			pwdNotEmpty: "Password should not be empty",
			cfpasswordNotEqual: "Please input the same password",
			piu: 'Please input username',
			length: 'Length: 6 ~ 20 chars.',
			pie: "Please input your email address",
			emailInvalid: "Please input the valid email",
			pip: "Please input your password",
			pLength: "Length should be more than 8 chars.",
			pCfpassword: "Please confirm your password",
			signupSuccess: "Sign up successfully!",
		},
		about: {
			Education: "Education",
			Undergraduate: "Undergraduate",
			b1: "Bachelor of Science in Electrical Engineering",
			b2: "From 2011 to 2015",
			Graduate: "Graduate",
			m1: "Master of Science in Computer Engineering",
			m2: "From 2015 to Now",
			Internship: "Internship",
			i1: "Software Developer Intern",
			i2: "From Jan 2017 to Jun 2017",
			Skills: "Skills",
			fg: "Firmly Grasp :",
			learnt: "Have Learnt :",
			Hobby: "Hobby",
			music: "Listen to Music",
			soccer: "Watch Soccer Games",
			game: "Play Video Games",
			social: "Social Media",
		},
		contact: {
			name: "Name",
			advice: "Advice",
			bug: "Found Bug",
			content: "Content",
			checkSelect: "Please select one option",
			checkContent: "Please enter the content of message",
			checkName: "Please enter your name",
			thanks: "Thanks for advice!",
			error: "Fail to submit the form. Please retry later.",
			adviceOrBug: "Message type",
		},
		account: {
			Profile: "Profile",
			cp: "Change Password",
			Collection: "Collection",
			profile: {
				Username: "Username",
				Email: "Email",
				Role: "Role",
				Firstname: "Firstname",
				Lastname: "Lastname",
				Age: "Age",
				Gender: "Gender",
				gender: {
					Male: "Male",
					Female: "Female",
					Secret: "Secret"
				},
				button: {
					Submit: "Submit",
					Cancel: "Cancel",
					Modify: "Modify Profile"
				},
				warn: {
					Firstname: "Firstname should only contain letters.",
					Lastname: "Lastname should only contain letters.",
					Age: "Age should be between 0 and 150.",
					message: "Error occurs when modifying your personal information."
				},
				success: "Successfully update your personal information.",
			},
			changePassword: {
				oldpwd: "Please input your old password: ",
				newpwd: "Please input your new password: ",
				confirmnewpwd: "Please confirm your new password: ",
				success: "Successfully changed your password."
			},
			collection: {
				noCollection: "You have no collection now",
			}
		},
		blog: {
			search: "Search For Posts: ",
			tags: "Tags: ",
			bac: {
				author: "Author: ",
				readmore: "Read More...",
			},
			onepost: {
				created: "Created At: ",
				clicks: "Clicks: ",
				comments: "Comments: ",
				comment: {
					none: "No comment yet, you can be the first one :)",
					placeholder: "Please input the comment... ",
				},
				loginBeforeCollect: "You need to login to collect a post. Do you want to login now?",
				confirm: "Yes",
				info: "Info",
			},
			bytag: "Here are the posts with tag '{tag}' :",
			onsearch: "Here are the posts that contains '{search}' :",
			bycategory: "Here are the posts of category '{category}' :",
			clicks: "  Clicks: ",
			top: "Top 5 posts: ",
			collect: {
				click: "Click to collect",
				cancel: "Click to cancel collection",
			},
			like: {
				click: "Click to like",
				cancel: "Click to cancel like",
			},
			categories: "Categories: ",
			category: {
				content: "Content",
				create: "Create a new category: ",
				newCategory: {
					success: "Successfully created a new category.",
					failure: "Fail to create a new category."
				},
				select: "Select one category: ",
				add: "Add",
				addto: {
					success: "Successfully add category to the post.",
					failure: "Fail to add category to the post."
				}
			}
		},
		comment: {
			collapsed: " collapsed",
			add: {
				success: "Successfully add a comment!",
				failure: "Fail to add a comment. Please try again.",
			},
			reply: "reply",
			reply2: " reply",
			replies: " replies",
			cancel: "Cancel",
			commentOn: "Commented on:",
			second: " second ago",
			seconds: " seconds ago",
			minute: " minute ago",
			minutes: " minutes ago",
			hour: " hour ago",
			hours: " hours ago",
			day: " day ago",
			days: " days ago",
		},
		app: {
			todolist: {
				label1: "To Do List",
				label2: "What Have Done",
				label3: "What Over The Deadline",
				addNew: "Add a new task ...",
				table: {
					label1: "Content",
					label2: "Importance Level",
					label3: "Days Remaining",
					label4: "Operations",
					label5: "Finished Time",
					label6: "Deadline",
					modify: "Modify",
					finish: "Finished",
					delete: "Delete"
				},
				save: "Save",
				cancel: "Cancel",
				newTask: {
					deadline: "Deadline",
					rules: {
						content: "Content is required.",
						importance: "Importance is required.",
						deadline: {
							required: "Deadline is required.",
							afterToday: "Deadline should not be previous to today."
						}
					},
					success: "Successfully add a task",
					failure: "Fail to add a task"
				}
			}
		}
	},
	// Chinese
	cn: {
		navbar: {
			Home: "首页",
			Blog: "博客",
			Apps: "应用",
			todoList: "未来计划表",
			loveSoccor: "爱足球",
			simpleTB: "迷你版淘宝",
			About: "关于我",
			Admin: "管理员",
			signup: "注册",
			Welcome: "欢迎",
			Account: "我的账户",
			Logout: "登出",
			Login: "登录",
			Contact: "联系我",
		},
		login: {
			Email: "邮箱",
			Password: "密码",
			checkEmail: "请输入您的邮箱",
			checkEmail2: "请输入有效邮箱地址",
			checkPassword: "请输入您的密码",
			Submit: "确定",
			Reset: "重置",
			cong: "恭喜",
			loginSuccess: "登录成功！",
		},
		signup: {
			Username: "用户名",
			cfpassword: "确认密码",
			pwdNotEmpty: "密码不应该为空",
			cfpasswordNotEqual: "请输入相同的密码",
			piu: '请输入用户名',
			length: '长度为6至20个字符（即3至10个汉字）',
			pie: "请输入您的邮箱",
			emailInvalid: "请输入有效邮箱地址",
			pip: "请输入您的密码",
			pLength: "长度必须超过8个字符",
			pCfpassword: "请确认您的密码",
			signupSuccess: "注册成功！",
		},
		about: {
			Education: "教育背景",
			Undergraduate: "大学本科",
			b1: "EE本科文凭",
			b2: "从2011年至2015年",
			Graduate: "研究生",
			m1: "计算机工程研究生在读",
			m2: "从2015年至今",
			Internship: "实习经历",
			i1: "实习软件工程师",
			i2: "从2017年1月至6月",
			Skills: "专业技能",
			fg: "熟练掌握：",
			learnt: "有所涉猎：",
			Hobby: "个人兴趣",
			music: "听音乐",
			soccer: "看球赛",
			game: "玩游戏",
			social: "个人社交媒体",
		},
		contact: {
			name: "姓名",
			advice: "个人建议",
			bug: "发现的Bug",
			content: "建议内容",
			checkSelect: "请选择一项建议",
			checkContent: "请输入建议内容",
			checkName: "请输入您的姓名",
			thanks: "谢谢您的建议与反馈！",
			error: "未能成功提交，请稍后再试",
			adviceOrBug: "建议类型",
		},
		account: {
			Profile: "个人档案",
			cp: "修改密码",
			Collection: "收藏",
			profile: {
				Username: "用户名",
				Email: "邮箱",
				Role: "权限",
				Firstname: "名",
				Lastname: "姓",
				Age: "年龄",
				Gender: "性别",
				gender: {
					Male: "男",
					Female: "女",
					Secret: "保密"
				},
				button: {
					Submit: "确定",
					Cancel: "取消",
					Modify: "修改个人资料"
				},
				warn: {
					Firstname: "名字中只能包含中文或英文字符",
					Lastname: "姓中只能包含中文或英文字符",
					Age: "年龄应在0至150之间",
					message: "在更新您的个人信息时发生错误，请稍后再试。"
				},
				success: "更新个人信息成功！",
			},
			changePassword: {
				oldpwd: "请输入您的密码： ",
				newpwd: "请输入新的密码： ",
				confirmnewpwd: "请确认新的密码： ",
				success: "修改密码成功！"
			},
			collection: {
				noCollection: "您还未收藏任何文章",
			}
		},
		blog: {
			search: "搜索文章：",
			tags: "标签：",
			bac: {
				author: "作者：",
				readmore: "阅读更多...",
			},
			onepost: {
				created: "创建于：",
				clicks: "点击量：",
				comments: "评论：",
				comment: {
					none: "还没人评论呢，快来抢沙发吧！",
					placeholder: "请输入评论",
				},
				loginBeforeCollect: "登录之后才能收藏文章。你想现在登录吗？",
				confirm: "是的",
				info: "注意啦：",
			},
			bytag: "下面是所有拥有标签‘{tag}’的文章：",
			onsearch: "下面是所有包含‘{search}’的文章：",
			bycategory: "下面是所有属于'{category}'类别的文章 :",
			clicks: "  点击量：",
			top: "最受欢迎的5篇博文：",
			collect: {
				click: "点击收藏",
				cancel: "点击取消收藏",
			},
			like: {
				click: "喜欢就点击一下吧",
				cancel: "点击取消喜欢",
			},
			categories: "分类：",
			category: {
				content: "名称",
				create: "新建一个分类：",
				newCategory: {
					success: "成功添加分类",
					failure: "添加分类失败"
				},
				select: "选择一个分类：",
				add: "添加",
				addto: {
					success: "成功将文章添加分类",
					failure: "添加分类失败"
				}
			}
		},
		comment: {
			collapsed: " 点击查看",
			add: {
				success: "留言成功！",
				failure: "留言失败，请稍后再试。",
			},
			reply: "回复",
			reply2: "条回复",
			replies: "条回复",
			cancel: "取消",
			commentOn: "评论于：",
			second: " 秒前",
			seconds: " 秒前",
			minute: " 分钟前",
			minutes: " 分钟前",
			hour: " 小时前",
			hours: " 小时前",
			day: " 天前",
			days: " 天前",
		},
		app: {
			todolist: {
				label1: "计划清单",
				label2: "已经完成的任务",
				label3: "逾期未完成的计划",
				addNew: "添加一个新任务 ...",
				table: {
					label1: "内容",
					label2: "重要程度",
					label3: "离截止日还剩（天）",
					label4: "操作",
					label5: "完成时间",
					label6: "截止日",
					modify: "编辑",
					finish: "完成",
					delete: "删除"
				},
				save: "保存",
				cancel: "取消",
				newTask: {
					deadline: "截止日期",
					rules: {
						content: "请输入任务内容",
						importance: "请输入任务重要程度",
						deadline: {
							required: "请输入任务截止日",
							afterToday: "任务截止日要在今天之后"
						}
					},
					success: "成功添加任务",
					failure: "添加任务失败"
				}
			}
		}
	}
};

export default messages;