import React, { useState, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { I18nContext } from "../../../contexts/i18n";
import Popover from "../../../components/ui/popover";
import { Button, ButtonVariant } from "../../../components/component-library";

const SelectQuotePopover = ({
  quoteDataRows = [],
  onClose = null,
  onSubmit = null,
  swapToSymbol,
  initialAggId,
  onQuoteDetailsIsOpened,
  hideEstimatedGasFee
}) => {
  const t = useContext(I18nContext);
  
  const [sortDirection, setSortDirection] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  
  const [selectedAggId, setSelectedAggId] = useState(initialAggId);
  
	const closeDetailAndSetViewToListStateRefresher =
		useCallback(() => {
			setSelectedAggId(null); // Reset selection when closing details.
			setContentView("sortList");
		}, []);
	
	return (
		<div className="select-quote-popover">
			<Popover
				title={
					t(contentView === "quoteDetails" ? 
						"swapSelectAQuote"
					 : "swapQuoteDetails")
				}
				subtitle={
					contentView === "sortList" &&
					t("swapSelectQuotePopoverDescription")
				}
				onClose={onClose}
        CustomBackground={() =>
         <div 
           className="select-quote-popover__popover-bg"
           onClick={onClose} />}
        className="select-quote-popover__popover-wrap"
        footerClassName="swaps__footer"
        footer={
          contentView !== 'quoteDetails' && (
            <>
              <Button variant={ButtonVariant.Secondary} onClick={onClose}>
                {t('close')}
              </Button>
              <Button variant={ButtonVariant.Primary} onClick={() => {
                 onSubmit(selectedAggId || initialAggId); onClose(); }}>
                {t('swapSelect')}
              </Button>
            </>
          )
        }
        
       >
			  {/* Render components based on view state */}
         {(contentView === 'sortList') && (
           /* Pass down handlers and data to list component */
           <SortableComponentWithControls
             quoteDataRows={[...quoteDataRows]}
             selectedItemId={selectedItemId || undefined}
             onItemClick={(itemId) => setSelectedItemId(itemId)}
             toggleItemPreview={(itemId) => handleToggleItemPreview(itemId)}
             
               /* Sorting logic handler */)
                
                   sortDirection=   sortDirection
                
                   sortHandler=     (...args) => updateSorting(args)
               />
              
           
           
         
          
            
             
               
                  
                     
            
                  )}}
            
                
                
                    
                    
                          
                        
                    
                      
                   
                 
                
                    


                   

                  }

                   


                  }
                

    

      
    
  

};
