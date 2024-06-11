import { useState, useEffect } from 'react';
import { sanitizeUri } from '../utils/sanitizeUri';

interface CompileOptions {
  // Define any options that might be needed for the compile service
}

const useCompile = () => {
  const [compiledTemplate, setCompiledTemplate] = useState<string | null>(null);

  const compile = (template: string, options?: CompileOptions) => {

    try {
      // Sanitize the template if needed
      const sanitizedTemplate = sanitizeUri(template);

      // Create a temporary div to hold the template
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = sanitizedTemplate;

      // Extract the content from the temporary div
      const compiledContent = tempDiv.innerHTML;

      // Set the compiled template state
      setCompiledTemplate(compiledContent);
    } catch (error) {
      console.error('Error compiling template:', error);
      setCompiledTemplate(null);
    }
  };
    // This function should take a template string and compile it into a React component or HTML string
    // Use the sanitizeUri utility function if needed
  };

  return {
    compile,
    compiledTemplate,
  };
};

export default useCompile;