export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JSON Tools",
    "description": "Free online JSON formatter, validator, and converter. Format, minify, validate JSON data. Convert JSON to XML, CSV. Professional developer tools for JSON processing.",
    "url": "https://jsontools.io",
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
    "screenshot": "https://jsontools.io/screenshot.png",
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
    "url": "https://jsontools.io",
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
    "url": "https://jsontools.io",
    "description": "Free online JSON formatter, validator, and converter tools",
    "inLanguage": ["en-US", "zh-CN", "es-ES", "pt-BR"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://jsontools.io/?q={search_term_string}"
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
        "item": "https://jsontools.io"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "JSON Tools",
        "item": "https://jsontools.io"
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