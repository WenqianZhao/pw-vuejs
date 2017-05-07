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
			i2: "From Jan 2017 to Now",
			Skills: "Skills",
			fg: "Firmly Grasp :",
			learnt: "Have Learnt :",
			Hobby: "Hobby",
			music: "Listen to Music",
			soccer: "Watch Soccer Games",
			game: "Play Video Games",
			social: "Social Media",
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
				}
			},
			bytag: "Here are the posts with tag '{tag}' :",
			onsearch: "Here are the posts that contains '{search}' :",
			clicks: "  Clicks: ",
			top: "Top 5 posts: ",
		},
		comment: {
			collapsed: " collapsed",
			add: {
				success: "Successfully add a comment!",
				failure: "Fail to add a comment. Please try again.",
			},
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
			i2: "从2017年1月至今",
			Skills: "专业技能",
			fg: "熟练掌握：",
			learnt: "有所涉猎：",
			Hobby: "个人兴趣",
			music: "听音乐",
			soccer: "看球赛",
			game: "玩游戏",
			social: "个人社交媒体",
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
				}
			},
			bytag: "下面是所有拥有标签‘{tag}’的文章：",
			onsearch: "下面是所有包含‘{search}’的文章：",
			clicks: "  点击量：",
			top: "最受欢迎的5篇博文：",
		},
		comment: {
			collapsed: " 点击查看",
			add: {
				success: "留言成功！",
				failure: "留言失败，请稍后再试。",
			},
		}
	}
};

export default messages;