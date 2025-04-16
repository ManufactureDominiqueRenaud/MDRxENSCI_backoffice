import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface SendCodeEmailProps {
  validationCode: string;
  email: string;
  imageProject1: string;
  imageProject2: string;
  imageProject3: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const SendCodeEmail = ({
  validationCode,
  email,
  imageProject1,
  imageProject2,
  imageProject3,
}: SendCodeEmailProps) => {
  const previewText = `Use [${validationCode}] code to confirm your vote`;

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Preview>{previewText}</Preview>
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://tekpzijxcpujrulsvtci.supabase.co/storage/v1/object/public/supabase/files/logo-mdr.svg-ec58deb5c530a10f966fa64dc09e9cd8.svg`}
                width="100"
                height="40"
                alt="Manufacture Dominique Renaud Logo"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Confirm <strong>your vote</strong> using this{" "}
              <strong>code</strong> :
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>You</strong> (
              <Link
                href={`mailto:${email}`}
                className="text-blue-600 no-underline"
              >
                {email}
              </Link>
              ) just choose three projects you like on{" "}
              <strong>
                {" "}
                <Link
                  href={`ensci.dominiquerenaud.com`}
                  className="text-blue-600 no-underline"
                >
                  ensci.dominiquerenaud.com
                </Link>
              </strong>
              .
            </Text>
            <Section>
              <Row>
                <Column align="right">
                  <Img
                    className="rounded-md"
                    src={imageProject1}
                    width="64"
                    height="64"
                    alt={`Project 1 Thmbnail`}
                  />
                </Column>
                <Column align="center">
                  <Img
                    className="rounded-md"
                    src={imageProject2}
                    width="64"
                    height="64"
                    alt={`Project 2 Thmbnail`}
                  />
                </Column>
                <Column align="left">
                  <Img
                    className="rounded-md"
                    src={imageProject3}
                    width="64"
                    height="64"
                    alt={`Project 3 Thmbnail`}
                  />
                </Column>
              </Row>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              use this code to confirm your vote on the website:{" "}
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3">
                {validationCode}
              </Button>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This mail was intended for{" "}
              <span className="text-black">{email}</span>. This invite was
              sent on <span className="text-black">{(new Date()).toString()}</span>. If you
              were not expecting this email, you can ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SendCodeEmail;
