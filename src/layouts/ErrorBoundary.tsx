import React from 'react';
interface Props {
  children?: React.ReactNode;
}

interface State {
  error: any;
  errorInfo: {
    componentStack: any;
    // [index: string]: unknown | undefined;
  } | null;
}

export class ErrorBoundary extends React.Component<Props, State>{
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  // public static getDerivedStateFromError(_: Error): State {
  //   // Update state so the next render will show the fallback UI.
  //   return { error: "some error", errorInfo:{componentStack:'some stack'} };
  // }

  componentDidCatch(error: unknown, errorInfo: { componentStack: unknown; }) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Error: {this.state.error && this.state.error.toString()}</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.errorInfo.componentStack}
          </details>
          <h2><button onClick={() => this.setState({ errorInfo: null })} >Refresh</button></h2>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
