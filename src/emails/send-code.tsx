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

export const SendCodeEmailFR = ({
  validationCode,
  email,
  imageProject1,
  imageProject2,
  imageProject3,
}: SendCodeEmailProps) => {
  const previewText = `Utilisez [${validationCode}] ce code pour confirmer votre vote`;

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
              Validation de votre vote - Design Contest Manufacture Dominique
              Renaud x ENSCI Les Ateliers
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Dans le cadre du projet collaboratif entre la Manufacture
              Dominique Renaud et l&apos;ENSCI - Les Ateliers, nous vous
              invitons à valider votre vote concernant les propositions
              développées par les élèves.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Ce vote marque une étape clé de ce projet qui mêle innovation,
              transmission et création horlogère.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Votre sélection :
            </Text>
            <Section>
              <Row>
                <Column align="right">
                  <Img
                    className="rounded-md"
                    src={imageProject1}
                    width="128"
                    height="128"
                    alt={`Project 1 Thmbnail`}
                  />
                </Column>
                <Column align="center">
                  <Img
                    className="rounded-md"
                    src={imageProject2}
                    width="128"
                    height="128"
                    alt={`Project 2 Thmbnail`}
                  />
                </Column>
                <Column align="left">
                  <Img
                    className="rounded-md"
                    src={imageProject3}
                    width="128"
                    height="128"
                    alt={`Project 3 Thmbnail`}
                  />
                </Column>
              </Row>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Text className="text-black text-[14px] leading-[24px] text-center">
                Utilisez ce code pour confirmer votre vote sur le site :{" "}
              </Text>
              <Button className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3">
                {`${validationCode}`}
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Merci pour votre participation et votre engagement.
              <strong>L&apos;équipe Manufacture Dominique Renaud. </strong>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Ce mail est envoyé à <span className="text-black">{email}</span>.
              Ce code a été généré le
              <span className="text-black">{new Date().toString()}</span>. Si
              vous n&apos;êtes pas le destinataire de ce mail, vous pouvez
              l&apos;ignorer.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SendCodeEmailEN = ({
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
              As part of the collaborative project between Manufacture Dominique
              Renaud and ENSCI - Les Ateliers, we invite you to confirm your
              vote regarding the proposals developed by the students.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              This vote marks a key milestone in this project, which blends
              innovation, knowledge-sharing, and watchmaking creativity.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Your selection :
            </Text>
            <Section>
              <Row>
                <Column align="right">
                  <Img
                    className="rounded-md"
                    src={imageProject1}
                    width="128"
                    height="128"
                    alt={`Project 1 Thmbnail`}
                  />
                </Column>
                <Column align="center">
                  <Img
                    className="rounded-md"
                    src={imageProject2}
                    width="128"
                    height="128"
                    alt={`Project 2 Thmbnail`}
                  />
                </Column>
                <Column align="left">
                  <Img
                    className="rounded-md"
                    src={imageProject3}
                    width="128"
                    height="128"
                    alt={`Project 3 Thmbnail`}
                  />
                </Column>
              </Row>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Text className="text-black text-[14px] leading-[24px] text-center">
                Use this code to confirm your vote on the website:{" "}
              </Text>
              <Button className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3">
                {`${validationCode}`}
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Thank you for your participation and commitment.
              <strong>The Dominique Renaud Manufacture Team.</strong>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This mail was intended for{" "}
              <span className="text-black">{email}</span>. This code was sent on{" "}
              <span className="text-black">{new Date().toString()}</span>. If
              you were not expecting this email, you can ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
