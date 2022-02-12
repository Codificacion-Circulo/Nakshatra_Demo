import "./KnowMore.css";

const KnowMore = () => {
  return (
    <div className="knowMore__container container d-flex flex-column align-items-center">
      <div className="knowMore__sectionHeading">
        <p>W.H.O recommendation for Covid</p>
      </div>
      <div className="knowMore__containerDiv">
        {/* <div className="knowMore__profileInfoContainer">
          <div className="knowMore__profileDiv">
            <img
              src="http://images.unsplash.com/photo-1616012480717-fd9867059ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
              alt=""
            />
          </div>
          <div className="knowMore__infoDiv d-flex flex-column align-items-center">
            <div className="knowMore__infoHeading">
              <p>Covid</p>
            </div>
            <div className="knowMore__infoSubHeading">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt sapiente excepturi dignissimos saepe sit, iste iusto
                rem voluptas doloremque laudantium.
              </p>
            </div>
          </div>
        </div> */}
        <div className="knowMore__otherInfoDiv d-flex flex-column align-items-center">
          <div className="knowMore__otherInfoHeading">
            <p>Upcoming Steps</p>
          </div>
          <ul>
            <li>Terms</li>
            <p>
              By accessing this web site, you are agreeing to be bound by these
              web site Terms and Conditions of Use, all applicable laws and
              regulations, and agree that you are responsible for compliance
              with any applicable local laws. If you do not agree with any of
              these terms, you are prohibited from using or accessing this site.
              The materials contained in this web site are protected by
              applicable copyright and trade mark law.
            </p>

            <li>Use License</li>
            <p>
              Permission is granted to temporarily download one copy of the
              materials (information or software) on DevDeg's web site for
              personal, non-commercial transitory viewing only. This is the
              grant of a license, not a transfer of title, and under this
              license you may not: modify or copy the materials;
              <br />
              use the materials for any commercial purpose, or for any public
              display (commercial or non-commercial); attempt to decompile or
              reverse engineer any software contained on DevDeg's web site;
              remove any copyright or other proprietary notations from the
              materials; or transfer the materials to another person or "mirror"
              the materials on any other server.
              <br />
              This license shall automatically terminate if you violate any of
              these restrictions and may be terminated by DevDeg at any time.
              Upon terminating your viewing of these materials or upon the
              termination of this license, you must destroy any downloaded
              materials in your possession whether in electronic or printed
              format.
            </p>
            <li>Disclaimer</li>
            <p>
              The materials on DevDeg's web site are provided "as is". DevDeg
              makes no warranties, expressed or implied, and hereby disclaims
              and negates all other warranties, including without limitation,
              implied warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property
              or other violation of rights. Further, DevDeg does not warrant or
              make any representations concerning the accuracy, likely results,
              or reliability of the use of the materials on its Internet web
              site or otherwise relating to such materials or on any sites
              linked to this site.
            </p>

            <li>Limitations</li>
            <p>
              In no event shall DevDeg or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption,) arising out of the
              use or inability to use the materials on DevDeg's Internet site,
              even if DevDeg or a DevDeg authorized representative has been
              notified orally or in writing of the possibility of such damage.
              Because some jurisdictions do not allow limitations on implied
              warranties, or limitations of liability for consequential or
              incidental damages, these limitations may not apply to you.
            </p>

            <li>Revisions and Errata</li>
            <p>
              The materials appearing on DevDeg's web site could include
              technical, typographical, or photographic errors. DevDeg does not
              warrant that any of the materials on its web site are accurate,
              complete, or current.
              <br />
              DevDeg may make changes to the materials contained on its web site
              at any time without notice. DevDeg does not, however, make any
              commitment to update the materials.
            </p>

            <li>Links</li>
            <p>
              DevDeg has not reviewed all of the sites linked to its Internet
              web site and is not responsible for the contents of any such
              linked site.The inclusion of any link does not imply endorsement
              by DevDeg of the site. Use of any such linked web site is at the
              user's own risk.
            </p>

            <li>Site Terms of Use Modifications</li>
            <p>
              DevDeg may revise these terms of use for its web site at any time
              without notice. By using this web site you are agreeing to be
              bound by the then current version of these Terms and Conditions of
              Use.
            </p>
            <br />

            <li>Governing Law</li>
            <p>
              Any claim relating to DevDeg's web site shall be governed by the
              laws of Poland without regard to its conflict of law provisions.
            </p>
            <li>
              General Terms and Conditions applicable to Use of a Web Site.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KnowMore;
