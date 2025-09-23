  if (window.location.hostname === 'view.asiae.co.kr') {
    const script = document.createElement('script');
	  const modules = [
      '/js/asia_fcm_init.js'
    ];

    modules.forEach(src => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = src;
      document.head.appendChild(script);
    });
  }