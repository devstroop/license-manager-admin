
    import React from "react";
    import { useParams } from "react-router";
    import { formatLabel } from "../../utils/utils";
    import { ViewDetails } from "../../components/common/ViewDetails";
    import schemaJson from "./Authority.schema.json";
    import { listAuthoritys } from "../../services/Authority.service";
    
    const AuthorityDetails = ({ apiURL = "" }) => {
      const [BottomLineTab, setBottomLineTab] = React.useState("1");
      const params = useParams();
      const recordID = params.id;
    
      const modelName = formatLabel(schemaJson?.displayModelName);
    
      return (
        <div className="pageDetailView flex-column d-flex overflow-auto">
          <div className="py-2 px-2 mb-2 pageHead">
            <h4 className="mb-0">View {modelName} Record</h4>
          </div>
          <ViewDetails getDetails={listAuthoritys} apiURL={apiURL} modelName={schemaJson?.name} schemaJson={schemaJson} />
        </div>
      );
    };
    
    export default AuthorityDetails;
    
    