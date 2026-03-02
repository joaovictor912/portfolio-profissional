document.addEventListener("DOMContentLoaded", () => {

    // ===== SECTION NAVIGATION =====
    const topbarLinks = document.querySelectorAll(".topbar-link");
    const viewSections = document.querySelectorAll(".view-section");

    function switchSection(sectionId) {
        // Update nav
        topbarLinks.forEach(link => {
            link.classList.toggle("active", link.dataset.section === sectionId);
        });

        // Update sections
        viewSections.forEach(sec => {
            sec.classList.toggle("active", sec.id === "sec-" + sectionId);
        });
    }

    topbarLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            switchSection(link.dataset.section);
        });
    });

    // ===== HOME CTA BUTTONS =====
    document.querySelectorAll(".home-btn-primary, .home-btn-secondary").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const section = btn.dataset.section;
            if (section) switchSection(section);
        });
    });

    // ===== PROJECT SELECTOR =====
    const selectorTabs = document.querySelectorAll(".selector-tab");
    const bgImages = document.querySelectorAll(".bg-image");
    const projectDetails = document.querySelectorAll(".project-detail");

    function switchProject(projectId) {
        // Update tabs
        selectorTabs.forEach(tab => {
            tab.classList.toggle("active", tab.dataset.project === projectId);
        });

        // Update background images
        bgImages.forEach(img => {
            img.classList.toggle("active", img.id === "bgImg-" + projectId);
        });

        // Update detail panels
        projectDetails.forEach(detail => {
            detail.classList.toggle("active", detail.id === "detail-" + projectId);
        });
    }

    selectorTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            switchProject(tab.dataset.project);
        });
    });

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener("keydown", (e) => {
        const currentTab = document.querySelector(".selector-tab.active");
        if (!currentTab) return;
        const currentId = parseInt(currentTab.dataset.project);
        const totalProjects = selectorTabs.length;

        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            const nextId = currentId < totalProjects ? currentId + 1 : 1;
            switchProject(String(nextId));
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            const prevId = currentId > 1 ? currentId - 1 : totalProjects;
            switchProject(String(prevId));
        }
    });

    // ===== AUTO-CYCLE PROJECTS (subtle) =====
    let autoCycleInterval = null;
    let isPaused = false;

    function startAutoCycle() {
        autoCycleInterval = setInterval(() => {
            if (isPaused) return;
            const currentTab = document.querySelector(".selector-tab.active");
            if (!currentTab) return;
            const currentId = parseInt(currentTab.dataset.project);
            const totalProjects = selectorTabs.length;
            const nextId = currentId < totalProjects ? currentId + 1 : 1;
            switchProject(String(nextId));
        }, 5000);
    }

    // Pause auto-cycle on user interaction
    document.querySelector(".split-right")?.addEventListener("mouseenter", () => {
        isPaused = true;
    });

    document.querySelector(".split-right")?.addEventListener("mouseleave", () => {
        isPaused = false;
    });

    startAutoCycle();

    // ===== MOBILE BOTTOM NAV =====
    // Create mobile nav buttons dynamically on small screens
    function createMobileNav() {
        if (window.innerWidth > 650) return;

        const existing = document.querySelector(".mobile-bottom-nav");
        if (existing) return;

        const nav = document.createElement("div");
        nav.className = "mobile-bottom-nav";
        nav.style.cssText = "position:fixed;bottom:0;left:0;right:0;height:60px;background:#fff;border-top:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-around;z-index:200;";

        const sections = [
            { id: "home", icon: "fa-solid fa-house", label: "Início" },
            { id: "projects", icon: "fa-solid fa-folder", label: "Projetos" },
            { id: "skills", icon: "fa-solid fa-code", label: "Skills" },
            { id: "certificates", icon: "fa-solid fa-certificate", label: "Certs" },
            { id: "contact", icon: "fa-solid fa-envelope", label: "Contato" }
        ];

        sections.forEach(sec => {
            const btn = document.createElement("button");
            btn.innerHTML = '<i class="' + sec.icon + '"></i><span style="font-size:0.6rem;margin-top:2px;">' + sec.label + '</span>';
            btn.style.cssText = "display:flex;flex-direction:column;align-items:center;gap:2px;background:none;border:none;color:#64748b;font-size:1rem;padding:8px;cursor:pointer;transition:color 0.3s;";
            btn.addEventListener("click", () => {
                switchSection(sec.id);
                nav.querySelectorAll("button").forEach(b => b.style.color = "#64748b");
                btn.style.color = "#2563eb";
            });
            if (sec.id === "home") btn.style.color = "#2563eb";
            nav.appendChild(btn);
        });

        document.body.appendChild(nav);
    }

    createMobileNav();
    window.addEventListener("resize", createMobileNav);

});
