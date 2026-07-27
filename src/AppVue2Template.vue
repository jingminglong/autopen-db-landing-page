<template>
  <div class="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-blue-500/30">
    <!-- Navbar -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/logo.png" alt="AutoPen-DB Logo" class="h-10 w-auto object-contain" @error="handleImageError" />
          <div class="hidden w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <ShieldCheckIcon class="w-6 h-6 text-white" />
          </div>
          <span class="text-2xl font-montserrat-alt font-bold tracking-wider">
            AutoP<span class="text-[#FF8A00]">e</span>n-DB
          </span>
        </div>
        <a href="http://www.auto-security.cn/" target="_blank" rel="noopener noreferrer" class="px-6 py-2 rounded border border-white/20 hover:bg-white/10 transition-colors text-sm text-gray-300 inline-block">
          免费试用
        </a>
      </div>
    </nav>

    <!-- Floating Action Buttons -->
    <div class="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
      <div class="bg-white rounded-lg shadow-lg flex flex-col">
        <button class="p-3 hover:bg-gray-100 transition-colors group relative rounded-t-lg">
          <MessageCircleIcon class="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
          <div class="absolute right-full top-1/2 -translate-y-1/2 pr-4 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 cursor-default">
            <div class="bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex flex-col items-center">
              <img src="/qr1.png" alt="WeChat QR" class="w-32 h-auto object-contain rounded-sm" @error="handleImageError" />
              <div class="text-xs text-gray-600 mt-2 whitespace-nowrap font-medium">扫码添加微信</div>
            </div>
          </div>
        </button>
        <div class="w-full h-px bg-gray-100"></div>
        <button class="p-3 hover:bg-gray-100 transition-colors group relative">
          <PhoneIcon class="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform" />
          <div class="absolute right-full top-1/2 -translate-y-1/2 pr-4 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 cursor-default">
            <div class="bg-white px-6 py-4 rounded-xl shadow-xl border border-gray-100 whitespace-nowrap text-left">
              <div class="text-sm font-bold text-gray-800">沈经理</div>
              <div class="text-sm text-blue-600 font-medium mt-1">180-6199-2868</div>
            </div>
          </div>
        </button>
        <div class="w-full h-px bg-gray-100"></div>
        <button class="p-3 hover:bg-gray-100 transition-colors group relative rounded-b-lg">
          <MailIcon class="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform" />
          <div class="absolute right-full top-1/2 -translate-y-1/2 pr-4 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 cursor-default">
            <div class="bg-white px-6 py-4 rounded-xl shadow-xl border border-gray-100 whitespace-nowrap">
              <div class="text-sm text-gray-800">shenyao@tsari.tsinghua.edu.cn</div>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- AI Assistant & Scroll Top -->
    <div class="fixed right-6 bottom-10 flex flex-col gap-6 z-50 items-end">
      <!-- Chat Popup -->
      <div v-if="isChatOpen" class="absolute bottom-full right-0 mb-4 w-[360px] bg-[#F0F7FF] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/20" style="height: 600px;">
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4">
          <div class="flex items-center gap-2">
            <img src="/robot.png" alt="AI" class="w-8 h-8 object-contain" @error="handleImageError" />
            <BotIcon class="hidden w-6 h-6 text-blue-500" />
            <span class="font-bold text-xl tracking-wide"><span class="text-[#3B82F6]">AI智能</span><span class="text-gray-800">小助手</span></span>
          </div>
          <button @click="isChatOpen = false" class="w-8 h-8 bg-[#7CB8FF] rounded-full flex items-center justify-center text-white hover:bg-[#60A5FA] transition-colors shadow-sm">
            <ChevronDownIcon class="w-5 h-5" />
          </button>
        </div>

        <!-- Chat Content -->
        <div ref="chatScrollRef" class="flex-1 overflow-y-auto px-5 pb-2 flex flex-col gap-4 custom-scrollbar">
          <!-- Welcome Card -->
          <div class="bg-white rounded-xl p-4 flex gap-4 shadow-sm border border-blue-50">
            <div class="w-16 h-16 shrink-0 rounded-full overflow-hidden bg-[#E2E8F0] flex items-center justify-center border-2 border-white shadow-sm">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=e2e8f0" alt="Avatar" class="w-full h-full object-cover" />
            </div>
            <div>
              <h4 class="font-bold text-gray-800 mb-1.5 text-base">“你好！我是小探长，”</h4>
              <p class="text-[13px] text-gray-500 leading-relaxed">
                您的汽车渗透情报智能助手。我能提供漏洞检索、POC解析、工具推荐，以及安全事件、威胁源与攻击案例的全方位情报哦~
              </p>
            </div>
          </div>

          <!-- Suggestions -->
          <div v-if="chatMessages.length === 0" class="flex flex-col gap-3 items-start mt-2">
            <button @click="handleSendMessage('汽车漏洞的POC有哪些？')" class="bg-white px-4 py-3 rounded-xl text-[14px] text-gray-700 shadow-sm hover:bg-gray-50 transition-colors text-left border border-blue-50 w-max max-w-[90%]">
              汽车漏洞的POC有哪些？
            </button>
            <button @click="handleSendMessage('2025年汽车安全风险TOP10。')" class="bg-white px-4 py-3 rounded-xl text-[14px] text-gray-700 shadow-sm hover:bg-gray-50 transition-colors text-left border border-blue-50 w-max max-w-[90%]">
              2025年汽车安全风险TOP10。
            </button>
            <button @click="handleSendMessage('给我CVE-2024-31317攻击案例信息。')" class="bg-white px-4 py-3 rounded-xl text-[14px] text-gray-700 shadow-sm hover:bg-gray-50 transition-colors text-left border border-blue-50 w-max max-w-[90%]">
              给我CVE-2024-31317攻击案例信息。
            </button>
          </div>

          <!-- Messages -->
          <div v-for="(msg, idx) in chatMessages" :key="idx" :class="['flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start']">
            <div v-if="msg.role === 'assistant'" class="w-8 h-8 shrink-0 rounded-full overflow-hidden bg-[#E2E8F0] flex items-center justify-center border border-white shadow-sm mt-1">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=e2e8f0" alt="Avatar" class="w-full h-full object-cover" />
            </div>
            <div :class="['px-4 py-2.5 rounded-2xl max-w-[80%] text-[14px] leading-relaxed shadow-sm whitespace-pre-wrap', 
              msg.role === 'user' 
                ? 'bg-blue-500 text-white rounded-tr-sm' 
                : 'bg-white text-gray-700 rounded-tl-sm border border-blue-50'
            ]">
              {{ msg.content }}
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="flex gap-3 justify-start">
            <div class="w-8 h-8 shrink-0 rounded-full overflow-hidden bg-[#E2E8F0] flex items-center justify-center border border-white shadow-sm mt-1">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=e2e8f0" alt="Avatar" class="w-full h-full object-cover" />
            </div>
            <div class="px-4 py-3 rounded-2xl bg-white rounded-tl-sm border border-blue-50 shadow-sm flex items-center gap-1.5">
              <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-5 pt-2 bg-[#F0F7FF]">
          <div class="bg-white rounded-xl p-3 flex flex-col shadow-sm h-32 border border-blue-50 focus-within:border-blue-300 transition-colors">
            <textarea 
              v-model="chatInput"
              @keydown.enter.prevent="handleSendMessage(chatInput)"
              placeholder="请输入内容" 
              class="w-full flex-1 resize-none outline-none text-[14px] text-gray-700 placeholder-gray-400 bg-transparent"
            ></textarea>
            <div class="flex justify-end mt-2">
              <button 
                @click="handleSendMessage(chatInput)"
                :disabled="!chatInput.trim() || isTyping"
                :class="['px-5 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors font-medium',
                  chatInput.trim() && !isTyping
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-[#A7D0FF] text-white cursor-not-allowed'
                ]"
              >
                <Loader2Icon v-if="isTyping" class="w-4 h-4 animate-spin" />
                <SendIcon v-else class="w-4 h-4" />
                发送
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center cursor-pointer group" @click="isChatOpen = !isChatOpen">
        <div class="w-16 h-16 flex items-center justify-center mb-2 relative overflow-visible">
          <img src="/robot.png" alt="AI Assistant" class="w-16 h-16 object-contain scale-125 -translate-y-1" @error="handleImageError" />
          <BotIcon class="hidden w-10 h-10 text-blue-400" />
          <div class="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0B0F19] z-10"></div>
        </div>
        <span class="text-xs text-white font-medium">AI智能体</span>
      </div>
      <button 
        v-if="showScrollTop"
        @click="scrollToTop"
        class="w-10 h-10 bg-[#40E0D0] rounded-full flex items-center justify-center hover:bg-[#40E0D0]/80 transition-colors text-black shadow-lg shadow-[#40E0D0]/20"
      >
        <ChevronUpIcon class="w-6 h-6" />
      </button>
    </div>

    <main class="pt-20">
      <!-- Hero Section -->
      <section class="relative max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-center">
        <div class="lg:w-1/2 z-10 scroll-animate fade-up">
          <h1 class="text-5xl lg:text-6xl font-montserrat-alt font-bold mb-4 tracking-tight">
            AutoP<span class="text-[#FF8A00]">e</span>n-DB
          </h1>
          <h2 class="text-4xl lg:text-5xl font-bold mb-8">
            汽车渗透情报库
          </h2>
          <p class="text-gray-400 text-base leading-relaxed mb-10 max-w-xl">
            汽车渗透情报库是一个专为汽车网络安全设计的综合资源中心，它整合了汽车漏洞库（已知缺陷清单）、POC（漏洞验证代码）、测试工具（软硬攻击手段）、威胁情报（黑客组织与攻击战术）以及安全事件库（真实攻击案例），帮助专业人员快速复现风险、模拟真实攻击路径并评估潜在危害，从而在合法合规的前提下高效发现车辆弱点并制定精准的防御策略。
          </p>
          <a href="http://www.auto-security.cn/" target="_blank" rel="noopener noreferrer" class="px-6 py-3 bg-[#5B6CFF] hover:bg-[#4A5BE6] text-white rounded inline-flex items-center gap-2 font-medium transition-colors group w-max">
            了解更多
            <ArrowRightIcon class="w-4 h-4 group-hover:translate-x-1 transition-transform bg-white text-[#5B6CFF] rounded-full p-0.5" />
          </a>
        </div>
        <div class="lg:w-1/2 mt-16 lg:mt-0 relative flex justify-center items-center scroll-animate fade-left" style="transition-delay: 0.2s">
          <img 
            src="/hero-image.png" 
            alt="Hero Security Shield" 
            class="w-full max-w-2xl h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.2)] scale-110"
            @error="handleImageError"
          />
          <!-- Fallback Abstract Shield Graphic -->
          <div class="hidden relative w-full aspect-square max-w-2xl mx-auto">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)]"></div>
            <div class="absolute inset-10 border border-blue-500/20 rounded-full"></div>
            <div class="absolute inset-20 border border-cyan-500/20 rounded-full"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-64 h-72 bg-[#0B0F19] border border-cyan-500/30 rounded-xl flex items-center justify-center relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)]">
                <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                <ShieldCheckIcon class="w-32 h-32 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Grid -->
      <section class="max-w-7xl mx-auto px-6 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Feature 1 -->
          <div class="group bg-[#151923] border border-white/5 rounded-xl p-8 hover:bg-gradient-to-br hover:from-[#00A9F3] hover:to-[#59CDFF] hover:border-[#59CDFF]/50 transition-all duration-300 flex items-start gap-6 scroll-animate fade-up" style="transition-delay: 0.1s">
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-3 group-hover:text-white transition-colors">汽车安全风险</h3>
              <p class="text-sm text-gray-400 leading-relaxed group-hover:text-blue-50 transition-colors">
                智能网联汽车在"云 - 管 - 端 - 用"全链路中，因软件漏洞、通信缺陷、算法错误或供应链问题，导致车辆面临被非法远程控制、核心功能失效、敏感数据泄露乃至引发物理人身伤害的综合威胁。
              </p>
            </div>
            <div class="w-12 h-12 shrink-0 flex items-center justify-center">
              <TriangleAlertIcon class="w-10 h-10 text-[#F59E0B] fill-[#F59E0B]/20 group-hover:text-white/30 group-hover:fill-white/30 transition-colors duration-300" />
            </div>
          </div>

          <!-- Feature 2 -->
          <div class="group bg-[#151923] border border-white/5 rounded-xl p-8 hover:bg-gradient-to-br hover:from-[#00A9F3] hover:to-[#59CDFF] hover:border-[#59CDFF]/50 transition-all duration-300 flex items-start gap-6 scroll-animate fade-up" style="transition-delay: 0.2s">
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-3 group-hover:text-white transition-colors">漏洞POC</h3>
              <p class="text-sm text-gray-400 leading-relaxed group-hover:text-blue-50 transition-colors">
                用于实证汽车漏洞库中记录的缺陷是真实存在且可被利用的；它通过模拟攻击复现漏洞效果（如解锁车门、执行任意代码），将理论风险转化为可视化的安全验证，帮助测试人员快速确认危害并评估修复优先级。
              </p>
            </div>
            <div class="w-12 h-12 shrink-0 flex items-center justify-center">
              <BadgeCheckIcon class="w-10 h-10 text-[#10B981] fill-[#10B981]/20 group-hover:text-white/30 group-hover:fill-white/30 transition-colors duration-300" />
            </div>
          </div>

          <!-- Feature 3 -->
          <div class="group bg-[#151923] border border-white/5 rounded-xl p-8 hover:bg-gradient-to-br hover:from-[#00A9F3] hover:to-[#59CDFF] hover:border-[#59CDFF]/50 transition-all duration-300 flex items-start gap-6 scroll-animate fade-up" style="transition-delay: 0.3s">
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-3 group-hover:text-white transition-colors">渗透测试工具</h3>
              <p class="text-sm text-gray-400 leading-relaxed group-hover:text-blue-50 transition-colors">
                涵盖硬件接口设备（如CAN总线分析仪、OBD调试器）、无线攻击套件（针对蓝牙、Wi-Fi、钥匙信号的嗅探与重放工具）以及软件分析平台（固件逆向、模糊测试、漏洞扫描脚本）。
              </p>
            </div>
            <div class="w-12 h-12 shrink-0 flex items-center justify-center">
              <ArchiveIcon class="w-10 h-10 text-[#3B82F6] fill-[#3B82F6]/20 group-hover:text-white/30 group-hover:fill-white/30 transition-colors duration-300" />
            </div>
          </div>

          <!-- Feature 4 -->
          <div class="group bg-[#151923] border border-white/5 rounded-xl p-8 hover:bg-gradient-to-br hover:from-[#00A9F3] hover:to-[#59CDFF] hover:border-[#59CDFF]/50 transition-all duration-300 flex items-start gap-6 scroll-animate fade-up" style="transition-delay: 0.4s">
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-3 group-hover:text-white transition-colors">汽车信息安全事件</h3>
              <p class="text-sm text-gray-400 leading-relaxed group-hover:text-blue-50 transition-colors">
                汽车安全事件是黑客利用漏洞成功实施的真实攻击事故（如远程控车、数据泄露或勒索锁车），区别于理论风险，它直接造成实际损害并触发紧急召回与法律追责。
              </p>
            </div>
            <div class="w-12 h-12 shrink-0 flex items-center justify-center">
              <ShieldCheckIcon class="w-10 h-10 text-[#06B6D4] fill-[#06B6D4]/20 group-hover:text-white/30 group-hover:fill-white/30 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </section>

      <!-- Case Study 1: Android -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold inline-flex items-center gap-3" style="font-family: 'PMZDBiaoTi-regular', sans-serif;">
            Android漏洞 - <span class="text-gray-300">攻击案例</span>
          </h2>
          <div class="mx-auto mt-4" style="width: 150px; height: 17px; border-radius: 11px; background: linear-gradient(95.97deg, rgba(6,121,247,0.6) -12.6%, rgba(255,255,255,0) 77.05%);"></div>
        </div>

        <div class="flex flex-col lg:flex-row gap-12 items-center">
          <div class="lg:w-1/2 scroll-animate fade-right">
            <h3 class="text-2xl font-bold text-[#F59E0B] mb-4">CVE-2024-31317</h3>
            <p class="text-gray-300 leading-relaxed mb-8 text-base">
              漏洞（右侧视频）是由Android框架中 ZygoteProcess.java文件的multiple方法存在不安全的反序列化问题导致的，该漏洞影响Android 9至Android 13的所有版本，如果不通过官方补丁进行及时修复，攻击者可利用此漏洞在目标设备上以系统级权限执行任意代码。
            </p>
            <a href="http://www.auto-security.cn/" target="_blank" rel="noopener noreferrer" class="px-6 py-2 border border-[#06B6D4] text-[#06B6D4] rounded hover:bg-[#06B6D4]/10 transition-colors inline-flex items-center gap-2 text-sm w-max">
              了解更多
              <ArrowRightIcon class="w-4 h-4 bg-[#06B6D4] text-[#0B0F19] rounded-full p-0.5" />
            </a>
          </div>
          <div class="lg:w-1/2 w-full scroll-animate fade-left" style="transition-delay: 0.2s">
            <div class="aspect-video bg-[#1A1A1A] rounded border border-white/10 relative overflow-hidden group">
              <video 
                src="/demo-video.mp4" 
                controls 
                class="w-full h-full object-cover rounded"
                poster="/hero-image.png"
              >
                您的浏览器不支持 HTML5 视频。
              </video>
            </div>
          </div>
        </div>
      </section>

      <!-- Case Study 2: Bluetooth -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold inline-flex items-center gap-3" style="font-family: 'PMZDBiaoTi-regular', sans-serif;">
            蓝牙漏洞 - <span class="text-gray-300">攻击案例</span>
          </h2>
          <div class="mx-auto mt-4" style="width: 150px; height: 17px; border-radius: 11px; background: linear-gradient(95.97deg, rgba(6,121,247,0.6) -12.6%, rgba(255,255,255,0) 77.05%);"></div>
        </div>

        <div class="flex flex-col-reverse lg:flex-row gap-12 items-center">
          <div class="lg:w-1/2 w-full scroll-animate fade-right">
            <div class="aspect-video bg-[#1A1A1A] rounded border border-white/10 relative overflow-hidden group">
              <video 
                src="/demo-video.mp4" 
                controls 
                class="w-full h-full object-cover rounded"
                poster="/hero-image.png"
              >
                您的浏览器不支持 HTML5 视频。
              </video>
            </div>
          </div>
          <div class="lg:w-1/2 scroll-animate fade-left" style="transition-delay: 0.2s">
            <h3 class="text-2xl font-bold text-[#F59E0B] mb-4">CVE-2025-38473</h3>
            <p class="text-gray-300 leading-relaxed mb-8 text-base">
              漏洞（左侧视频）是 Linux 内核中的一个 Bluetooth 子系统漏洞，该漏洞源于 l2cap_sock_resume_cb() 函数对空指针的错误解引用。当该函数在处理 Bluetooth L2CAP 套接字时，如果 chan-&gt;data 为 NULL，仍尝试访问其成员，可能导致内核崩溃（KASAN 报告: null-ptr-deref）。
            </p>
            <a href="http://www.auto-security.cn/" target="_blank" rel="noopener noreferrer" class="px-6 py-2 border border-[#06B6D4] text-[#06B6D4] rounded hover:bg-[#06B6D4]/10 transition-colors inline-flex items-center gap-2 text-sm w-max">
              了解更多
              <ArrowRightIcon class="w-4 h-4 bg-[#06B6D4] text-[#0B0F19] rounded-full p-0.5" />
            </a>
          </div>
        </div>
      </section>

      <!-- More Vulnerabilities Grid -->
      <section class="max-w-7xl mx-auto px-6 py-20 overflow-hidden scroll-animate fade-up">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold inline-flex items-center gap-3" style="font-family: 'PMZDBiaoTi-regular', sans-serif;">
            更多漏洞 - <span class="text-gray-300">攻击案例</span>
          </h2>
          <div class="mx-auto mt-4" style="width: 150px; height: 17px; border-radius: 11px; background: linear-gradient(95.97deg, rgba(6,121,247,0.6) -12.6%, rgba(255,255,255,0) 77.05%);"></div>
        </div>

        <div 
          class="relative w-full mb-12 group overflow-hidden"
          style="mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);"
        >
          <div class="flex w-max animate-marquee group-hover:[animation-play-state:paused] gap-4">
            <div v-for="(item, index) in marqueeItems" :key="index" class="bg-[#151923] border border-white/5 rounded px-6 py-4 text-center w-48 shrink-0 hover:border-white/20 transition-colors cursor-pointer">
              <div class="font-mono text-gray-200 mb-1 text-sm">{{ item.id }}</div>
              <div class="text-[#F59E0B] text-xs">{{ item.type }}</div>
            </div>
          </div>
        </div>

        <div class="text-center text-gray-500 text-sm">
          了解更多关于漏洞情报信息，请联系我们
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/5 bg-[#080B13] pt-16 pb-8 relative overflow-hidden mt-10">
      <!-- Abstract background element -->
      <div class="absolute right-0 bottom-0 opacity-20 pointer-events-none">
        <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M150 200L300 50V200H150Z" fill="url(#paint0_linear)"/>
          <path d="M0 200L150 50V200H0Z" fill="url(#paint1_linear)"/>
          <defs>
            <linearGradient id="paint0_linear" x1="225" y1="50" x2="225" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6"/>
              <stop offset="1" stopColor="#06B6D4" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint1_linear" x1="75" y1="50" x2="75" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981"/>
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
        <div>
          <div class="text-3xl font-bold tracking-tighter mb-4 flex items-center gap-2">
             <span class="text-white">UIOIO</span>
          </div>
          <a href="http://www.auto-security.cn/" target="_blank" rel="noopener noreferrer" class="block w-fit text-sm text-gray-400 mb-2 hover:text-blue-400 transition-colors">江苏省智能网联汽车创新中心</a>
          <div class="text-xs text-gray-500 mb-6 leading-relaxed">
            技术支持: 江苏智能网联汽车创新中心有限公司<br/>
            Copyright@2026 江苏智联 版权所有 苏ICP备12002324号-1
          </div>
        </div>

        <div>
          <div class="text-sm text-gray-400 mb-4">联系我们</div>
          <div class="flex gap-6 items-start">
            <div class="flex gap-4">
              <!-- QR Code placeholders -->
              <div class="w-20 h-20 bg-white rounded flex items-center justify-center p-1">
                <div class="w-full h-full border-2 border-black border-dashed opacity-20 flex items-center justify-center">
                  <span class="text-[8px] text-black/40">QR</span>
                </div>
              </div>
              <div class="w-20 h-20 bg-white rounded flex items-center justify-center p-1">
                <div class="w-full h-full border-2 border-black border-dashed opacity-20 flex items-center justify-center">
                  <span class="text-[8px] text-black/40">QR</span>
                </div>
              </div>
            </div>
            <div class="text-xs text-gray-400 flex flex-col gap-2">
              <div>电话: 180-6199-2868 (沈经理)<br/>0512-63936869</div>
              <div>邮箱: shenyao@tsari.tsinghua.edu.cn</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
// 注意：如果您使用的是 Vue 2，您需要安装对应的图标库，例如 vue-feather-icons 或 lucide-vue (旧版)
// 这里假设您已经全局注册了这些图标组件，或者在下方局部引入
import { 
  ArrowRightIcon, 
  TriangleAlertIcon, 
  BadgeCheckIcon, 
  ArchiveIcon, 
  ShieldCheckIcon, 
  MessageCircleIcon, 
  PhoneIcon, 
  MailIcon, 
  BotIcon, 
  ChevronUpIcon,
  ChevronDownIcon,
  SendIcon,
  Loader2Icon
} from 'lucide-vue'; // 根据您实际使用的图标库调整

export default {
  name: 'AutoPenDB',
  components: {
    ArrowRightIcon, 
    TriangleAlertIcon, 
    BadgeCheckIcon, 
    ArchiveIcon, 
    ShieldCheckIcon, 
    MessageCircleIcon, 
    PhoneIcon, 
    MailIcon, 
    BotIcon, 
    ChevronUpIcon,
    ChevronDownIcon,
    SendIcon,
    Loader2Icon
  },
  data() {
    return {
      showScrollTop: false,
      isChatOpen: false,
      chatInput: '',
      chatMessages: [],
      isTyping: false,
      vulnerabilities: [
        { id: 'CVE-2024-50251', type: '内核崩溃' },
        { id: 'CVE-2018-9489', type: '信息泄露' },
        { id: 'CVE-2018-18955', type: '权限提升' },
        { id: 'CVE-2025-32462', type: '权限提升' },
        { id: 'CVE-2025-6019', type: '权限提升' },
        { id: 'CVE-2023-2002', type: '权限提升' },
        { id: 'CVE-2018-9493', type: '权限绕过' },
        { id: 'CVE-2024-0044', type: '权限提升' },
        { id: 'CVE-2023-52886', type: '内核崩溃' },
        { id: 'CVE-2024-53141', type: '内核崩溃' },
        { id: 'CVE-2023-1829', type: '内核崩溃' },
        { id: 'CVE-2025-12345', type: '权限提升' }
      ]
    };
  },
  computed: {
    marqueeItems() {
      // 复制一份数组以实现无缝滚动
      return [...this.vulnerabilities, ...this.vulnerabilities];
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    
    // Set up intersection observer for scroll animations
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          this.observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Observe all elements with scroll-animate class
    this.$nextTick(() => {
      document.querySelectorAll('.scroll-animate').forEach(el => {
        this.observer.observe(el);
      });
    });
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    async handleSendMessage(text) {
      if (!text.trim() || this.isTyping) return;

      this.chatMessages.push({ role: 'user', content: text });
      this.chatInput = '';
      this.isTyping = true;
      this.scrollToBottom();

      // AI Model Configuration
      const API_URL = "/api/chat"; // 调用本地后端接口解决跨域问题
      const MODEL_NAME = "qvq-max-2025-03-25"; // 替换为您的模型名称

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: MODEL_NAME,
            messages: this.chatMessages
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData ? JSON.stringify(errorData) : `HTTP Error ${response.status}`);
        }
        
        const data = await response.json();
        const aiResponse = data.choices?.[0]?.message?.content || "收到响应，但格式无法解析。";
        
        this.chatMessages.push({ role: 'assistant', content: aiResponse });
      } catch (error) {
        console.error("Chat API Error:", error);
        const errorMessage = error.message || String(error);
        
        setTimeout(() => {
          this.chatMessages.push({ 
            role: 'assistant', 
            content: `请求失败：${errorMessage}\n\n常见原因：\n1. 跨域拦截 (Failed to fetch)：浏览器阻止了直接访问第三方 API。如果是本地模型（如 Ollama），请配置允许跨域（OLLAMA_ORIGINS="*"）。\n2. API Key 或模型名称错误。\n3. 网络连接问题。` 
          });
          this.isTyping = false;
          this.scrollToBottom();
        }, 1000);
        return;
      }
      
      this.isTyping = false;
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatScrollRef;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    handleScroll() {
      this.showScrollTop = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    handleImageError(e) {
      e.target.style.display = 'none';
      if (e.target.nextElementSibling) {
        e.target.nextElementSibling.classList.remove('hidden');
      }
    }
  }
};
</script>

<style scoped>
/* Scroll Animations */
.scroll-animate {
  opacity: 0;
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.scroll-animate.fade-up {
  transform: translateY(40px);
}

.scroll-animate.fade-left {
  transform: translateX(40px);
}

.scroll-animate.fade-right {
  transform: translateX(-40px);
}

.scroll-animate.is-visible {
  opacity: 1;
  transform: translate(0, 0);
}

/* 如果您没有在全局配置 Tailwind 的 @layer utilities，可以将动画放在这里 */
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(calc(-50% - 0.5rem)); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}
</style>
