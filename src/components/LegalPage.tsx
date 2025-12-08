import { motion } from 'motion/react';
import { ArrowLeft, Shield, FileText, Cookie, AlertTriangle, BookOpen, GraduationCap, Newspaper, Users } from 'lucide-react';
import { Page } from '../App';

interface LegalPageProps {
  type: 'privacy-policy' | 'terms-of-service' | 'cookie-policy' | 'disclaimer' | 'documentation' | 'tutorials' | 'blog' | 'community';
  onNavigate: (page: Page) => void;
}

export function LegalPage({ type, onNavigate }: LegalPageProps) {
  const getContent = () => {
    switch (type) {
      case 'privacy-policy':
        return {
          icon: Shield,
          title: 'Privacy Policy',
          lastUpdated: 'December 8, 2025',
          sections: [
            {
              title: '1. Introduction',
              content: 'CyberPath ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our cybersecurity education platform.'
            },
            {
              title: '2. Information We Collect',
              content: 'We collect information that you provide directly to us, including:\n\n• Account information (name, email address, username)\n• Profile information (bio, location, website, avatar)\n• Learning progress and quiz results\n• Usage data and analytics\n• Device information and IP address'
            },
            {
              title: '3. How We Use Your Information',
              content: 'We use the collected information to:\n\n• Provide and improve our educational services\n• Personalize your learning experience\n• Track your progress and achievements\n• Send important updates and notifications\n• Analyze platform usage and performance\n• Ensure security and prevent fraud'
            },
            {
              title: '4. Data Security',
              content: 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.'
            },
            {
              title: '5. Data Sharing',
              content: 'We do not sell or rent your personal information to third parties. We may share your information only in the following circumstances:\n\n• With your explicit consent\n• To comply with legal obligations\n• To protect our rights and safety\n• With service providers who assist our operations'
            },
            {
              title: '6. Your Rights',
              content: 'You have the right to:\n\n• Access your personal data\n• Correct inaccurate data\n• Request deletion of your data\n• Object to data processing\n• Export your data\n• Withdraw consent at any time'
            },
            {
              title: '7. Cookies',
              content: 'We use cookies and similar technologies to enhance your experience. For more information, please refer to our Cookie Policy.'
            },
            {
              title: '8. Children\'s Privacy',
              content: 'Our platform is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13.'
            },
            {
              title: '9. Changes to This Policy',
              content: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.'
            },
            {
              title: '10. Contact Us',
              content: 'If you have any questions about this privacy policy, please contact us at:\n\nEmail: privacy@cyberpath.io\nWebsite: https://cyberpath.io/contact'
            }
          ]
        };
      
      case 'terms-of-service':
        return {
          icon: FileText,
          title: 'Terms of Service',
          lastUpdated: 'December 8, 2025',
          sections: [
            {
              title: '1. Acceptance of Terms',
              content: 'By accessing and using CyberPath, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.'
            },
            {
              title: '2. User Accounts',
              content: 'To access certain features, you must create an account. You are responsible for:\n\n• Maintaining the confidentiality of your account\n• All activities that occur under your account\n• Providing accurate and complete information\n• Notifying us of any unauthorized use'
            },
            {
              title: '3. Acceptable Use',
              content: 'You agree to use CyberPath only for lawful purposes. You must not:\n\n• Violate any laws or regulations\n• Infringe on intellectual property rights\n• Transmit malicious code or viruses\n• Attempt to gain unauthorized access\n• Harass or harm other users\n• Use automated systems to scrape data'
            },
            {
              title: '4. Educational Content',
              content: 'All educational content on CyberPath is provided for learning purposes only. You agree to:\n\n• Use knowledge responsibly and ethically\n• Not use learned skills for malicious purposes\n• Comply with all applicable laws\n• Understand that ethical hacking requires authorization'
            },
            {
              title: '5. Intellectual Property',
              content: 'All content, features, and functionality on CyberPath are owned by us and protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without permission.'
            },
            {
              title: '6. User Content',
              content: 'You retain ownership of content you submit, but grant us a license to use, display, and distribute it on our platform. You represent that you have the right to share such content.'
            },
            {
              title: '7. Disclaimers',
              content: 'CyberPath is provided "as is" without warranties of any kind. We do not guarantee that:\n\n• The service will be uninterrupted or error-free\n• Content will be accurate or complete\n• Defects will be corrected\n• The platform is free of harmful components'
            },
            {
              title: '8. Limitation of Liability',
              content: 'We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the platform.'
            },
            {
              title: '9. Termination',
              content: 'We reserve the right to suspend or terminate your account at any time for violations of these terms or for any other reason at our discretion.'
            },
            {
              title: '10. Changes to Terms',
              content: 'We may modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.'
            },
            {
              title: '11. Governing Law',
              content: 'These terms shall be governed by and construed in accordance with the laws of Indonesia, without regard to conflict of law provisions.'
            },
            {
              title: '12. Contact Information',
              content: 'For questions about these terms, contact us at:\n\nEmail: legal@cyberpath.io\nWebsite: https://cyberpath.io/contact'
            }
          ]
        };
      
      case 'cookie-policy':
        return {
          icon: Cookie,
          title: 'Cookie Policy',
          lastUpdated: 'December 8, 2025',
          sections: [
            {
              title: '1. What Are Cookies',
              content: 'Cookies are small text files stored on your device when you visit our website. They help us provide a better user experience by remembering your preferences and understanding how you use our platform.'
            },
            {
              title: '2. Types of Cookies We Use',
              content: 'We use the following types of cookies:\n\n• Essential Cookies: Required for the website to function properly\n• Functional Cookies: Remember your preferences and settings\n• Analytics Cookies: Help us understand how users interact with our platform\n• Performance Cookies: Improve website speed and performance'
            },
            {
              title: '3. Essential Cookies',
              content: 'These cookies are necessary for the platform to work and cannot be disabled:\n\n• Authentication cookies (keep you logged in)\n• Security cookies (prevent unauthorized access)\n• Session cookies (maintain your session state)'
            },
            {
              title: '4. Functional Cookies',
              content: 'These cookies enhance your experience:\n\n• Language preferences\n• Theme settings (dark/light mode)\n• Content preferences\n• Progress tracking'
            },
            {
              title: '5. Analytics Cookies',
              content: 'We use analytics cookies to understand:\n\n• Which pages are most popular\n• How users navigate the platform\n• Time spent on different sections\n• User behavior patterns\n\nThis data is aggregated and anonymous.'
            },
            {
              title: '6. Third-Party Cookies',
              content: 'We may use third-party services that set their own cookies:\n\n• Analytics providers (e.g., Google Analytics)\n• Content delivery networks\n• Social media platforms\n\nThese third parties have their own privacy policies.'
            },
            {
              title: '7. Managing Cookies',
              content: 'You can control cookies through:\n\n• Browser settings (block or delete cookies)\n• Platform settings (disable non-essential cookies)\n• Third-party opt-out tools\n\nNote: Disabling essential cookies may affect functionality.'
            },
            {
              title: '8. Cookie Duration',
              content: 'Cookies may be:\n\n• Session cookies: Deleted when you close your browser\n• Persistent cookies: Remain on your device for a set period\n\nDuration varies based on cookie type and purpose.'
            },
            {
              title: '9. Updates to This Policy',
              content: 'We may update this cookie policy to reflect changes in our practices or for legal reasons. Please review this page periodically.'
            },
            {
              title: '10. Contact Us',
              content: 'If you have questions about our cookie policy:\n\nEmail: privacy@cyberpath.io\nWebsite: https://cyberpath.io/contact'
            }
          ]
        };
      
      case 'disclaimer':
        return {
          icon: AlertTriangle,
          title: 'Disclaimer',
          lastUpdated: 'December 8, 2025',
          sections: [
            {
              title: '1. General Information',
              content: 'The information provided on CyberPath is for educational purposes only. While we strive to provide accurate and up-to-date content, we make no representations or warranties regarding its completeness, accuracy, or reliability.'
            },
            {
              title: '2. Educational Purpose',
              content: 'CyberPath is designed to teach cybersecurity concepts and ethical hacking techniques for:\n\n• Defensive security purposes\n• Career development in cybersecurity\n• Understanding security vulnerabilities\n• Legal penetration testing\n\nAll content must be used ethically and legally.'
            },
            {
              title: '3. No Professional Advice',
              content: 'The content on this platform does not constitute:\n\n• Professional security consulting\n• Legal advice\n• Technical recommendations for specific systems\n• Certification or accreditation\n\nConsult qualified professionals for specific advice.'
            },
            {
              title: '4. Ethical Use Only',
              content: 'Users must commit to:\n\n• Using knowledge for legal purposes only\n• Obtaining proper authorization before testing systems\n• Respecting privacy and property rights\n• Complying with all applicable laws\n• Understanding that unauthorized access is illegal'
            },
            {
              title: '5. Legal Disclaimer',
              content: 'IMPORTANT: Unauthorized access to computer systems is illegal in most jurisdictions. Users are responsible for:\n\n• Understanding local laws and regulations\n• Obtaining proper permissions\n• Using techniques only on authorized systems\n• Accepting full responsibility for their actions'
            },
            {
              title: '6. No Warranty',
              content: 'CyberPath is provided "as is" without any warranties, express or implied. We do not warrant that:\n\n• The platform will be error-free\n• Content will always be current\n• Techniques will work in all scenarios\n• Learning outcomes are guaranteed'
            },
            {
              title: '7. Limitation of Liability',
              content: 'We shall not be liable for:\n\n• Any misuse of information provided\n• Damages resulting from platform use\n• Actions taken based on our content\n• Third-party content or links\n• System damage or data loss'
            },
            {
              title: '8. Third-Party Content',
              content: 'We may provide links to external resources. We are not responsible for:\n\n• Content on external websites\n• Accuracy of third-party information\n• Privacy practices of other sites\n• Availability of linked resources'
            },
            {
              title: '9. Changes and Updates',
              content: 'We reserve the right to:\n\n• Modify or discontinue features\n• Update content without notice\n• Change these disclaimers at any time\n• Remove content at our discretion'
            },
            {
              title: '10. User Responsibility',
              content: 'By using CyberPath, you acknowledge that:\n\n• You are solely responsible for your actions\n• You will use knowledge ethically and legally\n• You understand the risks involved\n• You accept these disclaimers in full'
            },
            {
              title: '11. Reporting Misuse',
              content: 'If you become aware of any misuse of our platform or content, please report it immediately to:\n\nEmail: abuse@cyberpath.io'
            },
            {
              title: '12. Contact',
              content: 'For questions about this disclaimer:\n\nEmail: legal@cyberpath.io\nWebsite: https://cyberpath.io/contact'
            }
          ]
        };
      
      case 'documentation':
        return {
          icon: BookOpen,
          title: 'Documentation',
          lastUpdated: 'December 8, 2025',
          sections: [
            {
              title: '1. Introduction',
              content: 'Welcome to the CyberPath documentation. This guide is designed to help you understand and utilize our cybersecurity education platform effectively.'
            },
            {
              title: '2. Getting Started',
              content: 'To begin, create an account and explore our courses and resources. Each course includes detailed modules and interactive quizzes to enhance your learning experience.'
            },
            {
              title: '3. Course Structure',
              content: 'Our courses are organized into modules, each covering specific topics in cybersecurity. Modules include:\n\n• Video lectures\n• Reading materials\n• Practical exercises\n• Quizzes and assessments'
            },
            {
              title: '4. Learning Resources',
              content: 'In addition to courses, we provide various resources to support your learning:\n\n• Articles and tutorials\n• Case studies\n• Security tools and software\n• Community forums'
            },
            {
              title: '5. Support and Assistance',
              content: 'If you have any questions or need assistance, our support team is here to help. Contact us via:\n\nEmail: support@cyberpath.io\nWebsite: https://cyberpath.io/contact'
            }
          ]
        };
      
      case 'tutorials':
        return {
          icon: GraduationCap,
          title: 'Tutorials',
          lastUpdated: 'December 8, 2025',
          sections: [
            {
              title: '1. Introduction',
              content: 'Welcome to the CyberPath tutorials. These step-by-step guides are designed to help you master various cybersecurity concepts and techniques.'
            },
            {
              title: '2. Tutorial Structure',
              content: 'Each tutorial is structured to provide a comprehensive understanding of a specific topic. Tutorials include:\n\n• Detailed explanations\n• Practical examples\n• Step-by-step instructions\n• Interactive quizzes'
            },
            {
              title: '3. Topics Covered',
              content: 'Our tutorials cover a wide range of cybersecurity topics, including:\n\n• Network security\n• Cryptography\n• Ethical hacking\n• Penetration testing\n• Incident response'
            },
            {
              title: '4. Learning Resources',
              content: 'In addition to tutorials, we provide various resources to support your learning:\n\n• Articles and guides\n• Case studies\n• Security tools and software\n• Community forums'
            },
            {
              title: '5. Support and Assistance',
              content: 'If you have any questions or need assistance, our support team is here to help. Contact us via:\n\nEmail: support@cyberpath.io\nWebsite: https://cyberpath.io/contact'
            }
          ]
        };
      
      case 'blog':
        return {
          icon: Newspaper,
          title: 'Blog',
          lastUpdated: 'December 8, 2025',
          sections: [
            {
              title: '1. Introduction',
              content: 'Welcome to the CyberPath blog. Our blog features articles, insights, and updates on the latest trends and developments in cybersecurity.'
            },
            {
              title: '2. Blog Structure',
              content: 'Our blog is organized into categories to help you find relevant content. Categories include:\n\n• Security news\n• Threat analysis\n• Best practices\n• Case studies\n• Industry trends'
            },
            {
              title: '3. Topics Covered',
              content: 'Our blog covers a wide range of cybersecurity topics, including:\n\n• Network security\n• Cryptography\n• Ethical hacking\n• Penetration testing\n• Incident response'
            },
            {
              title: '4. Learning Resources',
              content: 'In addition to blog posts, we provide various resources to support your learning:\n\n• Articles and guides\n• Case studies\n• Security tools and software\n• Community forums'
            },
            {
              title: '5. Support and Assistance',
              content: 'If you have any questions or need assistance, our support team is here to help. Contact us via:\n\nEmail: support@cyberpath.io\nWebsite: https://cyberpath.io/contact'
            }
          ]
        };
      
      case 'community':
        return {
          icon: Users,
          title: 'Community',
          lastUpdated: 'December 8, 2025',
          sections: [
            {
              title: '1. Introduction',
              content: 'Welcome to the CyberPath community. Our community is a vibrant space for learners, professionals, and enthusiasts to connect, share knowledge, and collaborate on cybersecurity projects.'
            },
            {
              title: '2. Community Structure',
              content: 'Our community is organized into forums and discussion groups to facilitate interaction. Forums include:\n\n• General discussions\n• Technical support\n• Project collaboration\n• Networking'
            },
            {
              title: '3. Topics Covered',
              content: 'Our community covers a wide range of cybersecurity topics, including:\n\n• Network security\n• Cryptography\n• Ethical hacking\n• Penetration testing\n• Incident response'
            },
            {
              title: '4. Learning Resources',
              content: 'In addition to community forums, we provide various resources to support your learning:\n\n• Articles and guides\n• Case studies\n• Security tools and software\n• Community forums'
            },
            {
              title: '5. Support and Assistance',
              content: 'If you have any questions or need assistance, our support team is here to help. Contact us via:\n\nEmail: support@cyberpath.io\nWebsite: https://cyberpath.io/contact'
            }
          ]
        };
    }
  };

  const content = getContent();
  const Icon = content.icon;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 group"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 border border-purple-500/30 rounded-2xl mb-6"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-8 h-8 text-purple-400" />
          </motion.div>
          
          <h1 className="text-white mb-4">{content.title}</h1>
          <p className="text-gray-400">
            Last Updated: {content.lastUpdated}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 space-y-8"
        >
          {content.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="space-y-3"
            >
              <h2 className="text-white">{section.title}</h2>
              <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                {section.content}
              </p>
              {index < content.sections.length - 1 && (
                <div className="h-px bg-purple-500/20 mt-6" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-gray-400 text-sm"
        >
          <p>
            If you have any questions or concerns, please contact us at{' '}
            <a href="mailto:legal@cyberpath.io" className="text-purple-400 hover:text-purple-300">
              legal@cyberpath.io
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}