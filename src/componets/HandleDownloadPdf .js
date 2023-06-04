import { useSelector } from 'react-redux';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { Button } from 'react-bootstrap';
import { rgb } from 'pdf-lib';


const HandleDownload = () => {
  const resumeData = useSelector((state) => state.data);

  const handleDownloadPdf = () => {
    generatePdfTemplate(resumeData);
};

const generatePdfTemplate = async (resumeData) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const { education, Experience, profile, skills } = resumeData;

  const colleges = education?.colleges || [];
  const experiences = Experience?.experiences || [];

  const college = colleges.length > 0 ? colleges[0].college : '';
  const qualification = colleges.length > 0 ? colleges[0].qualification : '';
  const educationFromYear = colleges.length > 0 ? colleges[0].fromYear : '';
  const educationToYear = colleges.length > 0 ? colleges[0].toYear : '';

  const company = experiences.length > 0 ? experiences[0].company : '';
  const position = experiences.length > 0 ? experiences[0].position : '';
  const experienceFromYear = experiences.length > 0 ? experiences[0].fromYear : '';
  const experienceToYear = experiences.length > 0 ? experiences[0].toYear : '';

  const firstname = profile?.firstname || '';
  const lastname = profile?.lastname || '';
  const email = profile?.email || '';
  const phone = profile?.phone || '';

  const profileText = `FirstName: ${firstname}\nlastname: ${lastname}\nEmail: ${email}\nPhone: ${phone}`;
  const educationText = `College: ${college}\nQualification: ${qualification}\nFrom Year: ${educationFromYear}\nTo Year: ${educationToYear}`;
  const experienceText = `Company: ${company}\nPosition: ${position}\nFrom Year: ${experienceFromYear}\nTo Year: ${experienceToYear}`;
  const skillsText = skills.join(', ');

  // Set the font size and color
  const fontSize = 12;
  const fontColor = rgb(0, 0, 0);

  // Set the position and line height for each section
  const profilePosition = { x: 50, y: 700 };
  const educationPosition = { x: 50, y: 600 };
  const experiencePosition = { x: 50, y: 500 };
  const skillsPosition = { x: 50, y: 400 };
  const lineHeight = 16;

  // Draw the text on the page with the specified style
  page.drawText(`Profile:\n${profileText}`, {
    x: profilePosition.x,
    y: profilePosition.y,
    font,
    size: fontSize,
    color: fontColor,
    lineHeight: lineHeight,
  });

  page.drawText(`Education:\n${educationText}`, {
    x: educationPosition.x,
    y: educationPosition.y,
    font,
    size: fontSize,
    color: fontColor,
    lineHeight: lineHeight,
  });

  page.drawText(`Experience:\n${experienceText}`, {
    x: experiencePosition.x,
    y: experiencePosition.y,
    font,
    size: fontSize,
    color: fontColor,
    lineHeight: lineHeight,
  });

  page.drawText(`Skills:\n${skillsText}`, {
    x: skillsPosition.x,
    y: skillsPosition.y,
    font,
    size: fontSize,
    color: fontColor,
    lineHeight: lineHeight,
  });

  const pdfBytes = await pdfDoc.save();
  downloadPdf(pdfBytes);
};


const downloadPdf = (pdfBytes) => {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Resume.pdf';
  link.click();
  URL.revokeObjectURL(url);
};
  
  


  return (
    <div>
      <Button variant="secondary" onClick={handleDownloadPdf} block>
        Download PDF
      </Button>
    </div>

  );
};

export default HandleDownload;
