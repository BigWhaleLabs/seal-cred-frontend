import {
  CardParagraphText,
  HeaderText,
  LinkText,
  SubheaderCardText,
} from 'components/ui/Text'
import Card from 'components/ui/Card'
import Section from 'components/ui/Section'
import classnames, { margin, space, width } from 'classnames/tailwind'

const cardWrapper = classnames(margin('mx-auto'), width('w-fit'))

export default function () {
  return (
    <div className={cardWrapper}>
      <Card shadow onlyWrap color="primary">
        <div className={space('space-y-4')}>
          <HeaderText>Terms of Service</HeaderText>
          <div className={space('space-y-4')}>
            <Section>
              <SubheaderCardText>Terms</SubheaderCardText>
              <CardParagraphText>
                By accessing this Website, you are agreeing to be bound by these
                Website Terms and Conditions of Use and agree that you are
                responsible for the agreement with any applicable local laws. If
                you disagree with any of these terms, you are prohibited from
                accessing this site. The materials contained in this Website are
                protected by copyright and trade mark law.
              </CardParagraphText>
            </Section>
            <Section>
              <SubheaderCardText>Disclaimer</SubheaderCardText>
              <CardParagraphText>
                All the materials on Service’s Website are provided "as is".
                Service makes no warranties, may it be expressed or implied,
                therefore negates all other warranties. Furthermore, Service
                does not make any representations concerning the accuracy or
                reliability of the use of the materials on its Website or
                otherwise relating to such materials or any sites linked to this
                Website.
              </CardParagraphText>
            </Section>
            <Section>
              <SubheaderCardText>Limitations</SubheaderCardText>
              <CardParagraphText>
                Service or its suppliers will not be hold accountable for any
                damages that will arise with the use or inability to use the
                materials on Service’s Website, even if Service or an authorize
                representative of this Website has been notified, orally or
                written, of the possibility of such damage. Some jurisdiction
                does not allow limitations on implied warranties or limitations
                of liability for incidental damages, these limitations may not
                apply to you.
              </CardParagraphText>
            </Section>
            <Section>
              <SubheaderCardText>Revisions and Errata</SubheaderCardText>
              <CardParagraphText>
                The materials appearing on Service’s Website may include
                technical, typographical, or photographic errors. Service will
                not promise that any of the materials in this Website are
                accurate, complete, or current. Service may change the materials
                contained on its Website at any time without notice. Service
                does not make any commitment to update the materials.
              </CardParagraphText>
            </Section>
            <Section>
              <SubheaderCardText>Links</SubheaderCardText>
              <CardParagraphText>
                Service has not reviewed all of the sites linked to its Website
                and is not responsible for the contents of any such linked site.
                The presence of any link does not imply endorsement by Service
                of the site. The use of any linked website is at the user’s own
                risk.
              </CardParagraphText>
            </Section>
            <Section>
              <SubheaderCardText>
                Site Terms of Use Modifications
              </SubheaderCardText>
              <CardParagraphText>
                Service may revise these Terms of Use for its Website at any
                time without prior notice. By using this Website, you are
                agreeing to be bound by the current version of these Terms and
                Conditions of Use.
              </CardParagraphText>
            </Section>
            <Section>
              <SubheaderCardText>Your Privacy</SubheaderCardText>
              <CardParagraphText>
                Please read our{' '}
                <LinkText internal url="/privacy">
                  Privacy Policy
                </LinkText>
                .
              </CardParagraphText>
            </Section>
            <Section>
              <SubheaderCardText>Governing Law</SubheaderCardText>
              <CardParagraphText>
                Any claim related to Service's Website shall be governed by the
                laws of ca without regards to its conflict of law provisions.
              </CardParagraphText>
            </Section>
            <Section>
              <SubheaderCardText>Encryption</SubheaderCardText>
              <CardParagraphText>
                In case if the user enables encryption, there is no way to
                decrypt the data without the password specified by the user.
              </CardParagraphText>
            </Section>
          </div>
        </div>
      </Card>
    </div>
  )
}
