<div className="max_1">
        <div className="colone">
          <div className="idk_1">
            <header>
              <div className="top">
                <div className="style">
                  <div className="stylev2">
                    <div className="filtre-dashboard">

                      <WelcomeMessage/>

                      <Tooltip title="Copy address">
                        <div className="copy" id="copyAddress">
                          <FaRegCopy />
                        </div>
                      </Tooltip>
                    </div>
                  </div>

                </div>
                {/* <div className="input">
                  <div className="loupe_">
                    <img src={search} alt="" />
                  </div>
                  <input
                    type="text"
                    placeholder="Token, pair, address..."
                    className="formulaire_2"
                  /> */}
                  {/* <button onClick={requestAccounts}>Connect your wallet</button> */}
                  {/* <div className="notif"></div>
                </div> */}
              </div>
            </header>
            <div className="scroll_contenu_1">
              {wallet && (

                // Section profile 

                <div className="groupe_profile">
                  <img src={profile} alt="" className="profile-image" />
                  <div className="groupe2_profile">
                    <h1 className="text-2xl mb-0 ml-2">Name.surname</h1>
                      <div className="profile_adress flex items-center">
                        <p>{formatAddress(wallet)}</p>
                        <button className="ml-3 flex items-center" type="button">
                          "svg_img_copy"
                          <img src={web} alt="" />
                        </button>
                      </div>
                      <div className="profile_button">
                        <button type="button">
                          {" "}
                          <img src={test3} alt="" />
                          Add Twitter
                        </button>
                        <button type="button">
                          {" "}
                          <img src={web} alt="" />
                          Add website
                        </button>
                        <button type="button">
                          {" "}
                          <img src={map} alt="" />
                          Add localisation
                        </button>
                      </div>
                  </div>

                  {/* split */}
                  <div className="ml-auto border-r-2 h-[80%] mx-4"></div>
                  {/* split */}
                
                  <div className="mr-[10%]">
                      <h1 className="text-2xl mb-0">
                        {wallet && (
                          <>
                            {" "}
                            {overall_balance.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </>
                        )}
                      </h1>
                      <p className="blanc text-sm">Available</p>
                      <p className="semi text-sm">
                        {wallet && (
                          <>
                            {available_balance.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </>
                        )}
                      </p>
                      {/*product amount data*/}
                      <p className="blanc text-sm">Transferable</p>
                      <p className="semi text-sm">
                        {wallet && (
                          <>
                            {(
                              overall_balance - available_balance
                            ).toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </>
                        )}
                      </p>
                      {/*product amount data*/}
                  </div>
                </div>

                // Section profile end

              )}
              <div className="groupe2">
                <div className="box3_">
                  <div className="topv1">
                    <p className="semi">My Assets</p>
                    <button type="button" onClick={handleTokenButtonClick}>
                      Token
                    </button>
                    {/*<button type="button" onClick={handleNFTButtonClick}>
                      NFT
                    </button>
                    <button
                      type="button"
                      onClick={handleTransactionButtonClick}
                    >
                      Transaction
                    </button>*/}
                  </div>
                  {wallet && (
                    <>
                      {showNFTContent ? (
                        <div className="nft">
                          <div className="box">
                            <div>
                              <img src={nftImageUrl} alt="" />
                            </div>
                            <div className="text_8">
                              <p className="desc">Moonbird#3688</p>
                              <p className="desc">0,1 LTC</p>
                            </div>
                          </div>
                          <div className="box">
                            <div>
                              <img src={nftImageUrl2} alt="" />
                            </div>
                            <div className="text_8">
                              <p className="desc">Moonbird#3689</p>
                              <p className="desc">0,1 LTC</p>
                            </div>
                          </div>
                          <div className="box">
                            <div>
                              <img src={nftImageUrl3} alt="" />
                            </div>
                            <div className="text_8">
                              <p className="desc">Moonbird#3690</p>
                              <p className="desc">0,1 LTC</p>
                            </div>
                          </div>
                        </div>
                      ) : showTokenContent ? (
                        <nav className="topline">
                          <table>
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Positions</th>
                                <th>Price</th>
                                <th>Vol. 24h</th>
                                <th>Available</th>
                                <th>Transferable</th>
                                <th>Marketcap</th>
                              </tr>
                            </thead>
                            <tbody className="semi">
                              {isLoading ? (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                  }}
                                >
                                  Loading ...
                                </div>
                              ) : (
                                <>
                                  {filteredBlockchain.map((token, index) => (
                                    <TickComponent
                                      key={index}
                                      tokenData={token}
                                    />
                                  ))}
                                </>
                              )}
                            </tbody>
                          </table>
                        </nav>
                      ) : showTransactionContent ? (
                        <nav className="topline">
                          <table>
                            <thead>
                              <tr>
                                <th>Transaction ID</th>
                                <th>Time</th>
                                <th>Content</th>
                                <th>From</th>
                                <th>To</th>
                              </tr>
                            </thead>
                            <tbody className="semi">
                              {filteredBlockchain.map((token, index) => (
                                <TickComponent3 key={index} tokenData={token} />
                              ))}
                            </tbody>
                          </table>
                        </nav>
                      ) : (
                        <div></div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>