function Home() {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="mb-4 text-slate-800 text-center">Welcome to home page</h1>
      <p className="mb-4 text-slate-700">
        React is a powerful JavaScript library for building user interfaces,
        developed and maintained by Facebook. It allows developers to create
        large web applications that can update and render efficiently in
        response to data changes. React's component-based architecture
        encourages the creation of reusable UI components, making the
        development process more modular and manageable.
      </p>
      <p className="mb-4 text-slate-700">
        One of the key features of React is its virtual DOM, which optimizes the
        rendering process by only updating the parts of the UI that have
        changed. This leads to faster and more efficient updates, enhancing the
        overall performance of web applications. React's declarative approach
        also simplifies the process of designing UIs by allowing developers to
        describe what the UI should look like for different states of the
        application, and React takes care of the rest.
      </p>
      <p className="mb-4 text-slate-700">
        React can be seamlessly integrated with other libraries and frameworks,
        such as Redux for state management and React Router for handling
        navigation and routing within the application. This flexibility allows
        developers to choose the tools and patterns that best suit their project
        requirements. Additionally, React's extensive ecosystem includes a wide
        range of third-party libraries and tools that further enhance its
        capabilities.
      </p>
      <p className="mb-4 text-slate-700">
        Learning React can open up numerous opportunities for developers, as it
        is widely used in the industry and has a strong community support.
        Whether you are building a simple single-page application or a complex
        enterprise-grade application, React provides the tools and best
        practices needed to create robust and high-performing user interfaces.
      </p>
    </div>
  );
}

export default Home;
