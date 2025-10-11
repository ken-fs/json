export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JSON Tools",
    "description": "Free online JSON formatter, validator, and converter. Format, minify, validate JSON data. Convert JSON to XML, CSV. Professional developer tools for JSON processing.",
    "url": "https://www.json1.org",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "JSON Tools Team"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "JSON Tools"
    },
    "inLanguage": ["en", "zh", "es", "pt"],
    "featureList": [
      "JSON formatting and beautification",
      "JSON validation and error detection", 
      "JSON minification and compression",
      "JSON to XML conversion",
      "JSON to CSV conversion",
      "Multi-language support",
      "Dark mode interface",
      "Real-time processing"
    ],
    "screenshot": "https://www.json1.org/screenshot.png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "JSON Tools",
    "url": "https://www.json1.org",
    "description": "Professional JSON processing tools for developers",
    "sameAs": [
      "https://github.com/jsontools",
      "https://twitter.com/jsontools"
    ]
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "JSON Tools",
    "url": "https://www.json1.org",
    "description": "Free online JSON formatter, validator, and converter tools",
    "inLanguage": ["en-US", "zh-CN", "es-ES", "pt-BR"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.json1.org/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "JSON Tools"
    }
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.json1.org"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "JSON Tools",
        "item": "https://www.json1.org"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  )
}